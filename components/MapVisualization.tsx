
import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import type { TraffickingRoute, Alert, HighRiskZone } from '../types';

interface MapVisualizationProps {
    routes: TraffickingRoute[];
    alerts: Alert[];
    zones: HighRiskZone[];
}

// Mock GeoJSON data for world map
const worldGeoJson = {
    "type": "FeatureCollection",
    "features": [
        { "type": "Feature", "properties": { "name": "World" }, "geometry": { "type": "Polygon", "coordinates": [ [ [-180, 90], [180, 90], [180, -90], [-180, -90], [-180, 90] ] ] } }
    ]
};

const riskColorMap: d3.ScaleLinear<string, string> = d3.scaleLinear<string>()
    .domain([0, 50, 100])
    .range(['#0ea5e9', '#facc15', '#ef4444']); // blue, yellow, red

const alertColorMap = {
    'High': '#ef4444',
    'Medium': '#facc15',
    'Low': '#3b82f6'
};

const zoneRiskColorMap = {
    'Critical': 'rgba(239, 68, 68, 0.4)',
    'High': 'rgba(250, 204, 21, 0.4)',
    'Moderate': 'rgba(59, 130, 246, 0.4)'
};

export const MapVisualization: React.FC<MapVisualizationProps> = ({ routes, alerts, zones }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const allCoords = useMemo(() => [
        ...routes.flatMap(r => [r.startPoint, r.endPoint, ...r.waypoints]),
        ...alerts.map(a => a.location),
        ...zones.map(z => z.coordinates)
    ], [routes, alerts, zones]);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current || allCoords.length === 0) return;

        const { width, height } = containerRef.current.getBoundingClientRect();
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous render

        const projection = d3.geoMercator()
            .fitSize([width, height], worldGeoJson as any);
        
        const pathGenerator = d3.geoPath().projection(projection);

        // Map background
        svg.append('path')
            .datum(d3.geoGraticule10())
            .attr('class', 'graticule')
            .attr('d', pathGenerator);

        svg.append('path')
            .datum({type: 'Sphere'})
            .attr('class', 'sphere')
            .attr('d', pathGenerator);

        // Render routes
        const routesGroup = svg.append('g').attr('class', 'routes');
        routes.forEach(route => {
            const linePoints = [route.startPoint, ...route.waypoints, route.endPoint].map(p => [p.lng, p.lat]);
            
            const geoLine = { type: 'LineString', coordinates: linePoints };
            const routePath = routesGroup.append('path')
                .datum(geoLine)
                .attr('d', pathGenerator)
                .attr('class', 'route-path')
                .style('stroke', riskColorMap(route.riskScore));
            
            const totalLength = routePath.node()?.getTotalLength() || 0;
            routePath.attr('stroke-dasharray', `${totalLength / 10} ${totalLength / 20}`)
        });

        // Render zones
        svg.append('g').attr('class', 'zones')
            .selectAll('circle')
            .data(zones)
            .enter()
            .append('circle')
            .attr('cx', d => projection([d.coordinates.lng, d.coordinates.lat])![0])
            .attr('cy', d => projection([d.coordinates.lng, d.coordinates.lat])![1])
            .attr('r', 15)
            .style('fill', d => zoneRiskColorMap[d.riskLevel])
            .style('stroke', d => d3.color(zoneRiskColorMap[d.riskLevel])?.darker(0.5).toString() || '#fff')
            .style('stroke-width', 1)
            .append('title')
            .text(d => `${d.name} (${d.riskLevel}) - ${d.primaryActivity}`);

        // Render alerts
        const alertsGroup = svg.append('g').attr('class', 'alerts');
        alertsGroup.selectAll('circle')
            .data(alerts)
            .enter()
            .append('circle')
            .attr('cx', d => projection([d.location.lng, d.location.lat])![0])
            .attr('cy', d => projection([d.location.lng, d.location.lat])![1])
            .attr('r', 5)
            .style('fill', d => alertColorMap[d.severity])
            .style('stroke', '#1f2937')
            .style('stroke-width', 1.5)
            .each(function() {
                const circle = d3.select(this);
                (function repeat() {
                    circle.transition().duration(1000)
                        .attr('r', 10)
                        .style('opacity', 0)
                        .transition().duration(1000)
                        .attr('r', 5)
                        .style('opacity', 1)
                        .on('end', repeat);
                })();
            })
            .append('title')
            .text(d => `${d.severity} Alert: ${d.description}`);

    }, [routes, alerts, zones, allCoords]);


    return (
        <div ref={containerRef} className="w-full h-full rounded-md overflow-hidden">
            <svg ref={svgRef} width="100%" height="100%"></svg>
        </div>
    );
};
