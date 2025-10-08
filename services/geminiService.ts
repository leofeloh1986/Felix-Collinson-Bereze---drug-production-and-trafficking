
import { GoogleGenAI, Type } from "@google/genai";
import type { DashboardData, NigerianState } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        metrics: {
            type: Type.ARRAY,
            description: "Key performance indicators about drug trafficking.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Title of the metric, e.g., 'Estimated Production Volume' or 'Street Value of Seizures'." },
                    value: { type: Type.STRING, description: "The current value of the metric, e.g., '120 tons' or '₦50,000,000'." },
                    change: { type: Type.STRING, description: "The change from the previous period, e.g., '+5.2%'." },
                    changeType: { type: Type.STRING, description: "Enum: 'increase', 'decrease', or 'stable'." }
                },
                required: ["title", "value", "change", "changeType"],
            }
        },
        alerts: {
            type: Type.ARRAY,
            description: "Real-time alerts for suspicious activities.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "Unique identifier for the alert." },
                    severity: { type: Type.STRING, description: "Enum: 'High', 'Medium', 'Low'." },
                    description: { type: Type.STRING, description: "A brief description of the alert." },
                    location: { 
                        type: Type.OBJECT, 
                        properties: {
                            lat: { type: Type.NUMBER, description: "Latitude of the alert." },
                            lng: { type: Type.NUMBER, description: "Longitude of the alert." }
                        },
                        required: ["lat", "lng"]
                    },
                    timestamp: { type: Type.STRING, description: "ISO 8601 timestamp of the alert." }
                },
                required: ["id", "severity", "description", "location", "timestamp"],
            }
        },
        routes: {
            type: Type.ARRAY,
            description: "Identified trafficking routes.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "Unique identifier for the route." },
                    riskScore: { type: Type.NUMBER, description: "A risk score from 0 to 100." },
                    startPoint: { 
                        type: Type.OBJECT,
                        properties: {
                            lat: { type: Type.NUMBER },
                            lng: { type: Type.NUMBER },
                            name: { type: Type.STRING }
                        },
                        required: ["lat", "lng", "name"]
                    },
                    endPoint: { 
                        type: Type.OBJECT,
                        properties: {
                            lat: { type: Type.NUMBER },
                            lng: { type: Type.NUMBER },
                            name: { type: Type.STRING }
                        },
                        required: ["lat", "lng", "name"]
                    },
                    waypoints: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                lat: { type: Type.NUMBER },
                                lng: { type: Type.NUMBER }
                            },
                            required: ["lat", "lng"]
                        }
                    },
                    estimatedVolume: { type: Type.STRING, description: "Estimated volume of drugs on this route, e.g., '500 kg'." }
                },
                required: ["id", "riskScore", "startPoint", "endPoint", "waypoints", "estimatedVolume"],
            }
        },
        highRiskZones: {
            type: Type.ARRAY,
            description: "Geographical zones with high illicit activity.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "Unique identifier for the zone." },
                    name: { type: Type.STRING, description: "Name of the high-risk zone." },
                    riskLevel: { type: Type.STRING, description: "Enum: 'Critical', 'High', 'Moderate'." },
                    primaryActivity: { type: Type.STRING, description: "e.g., 'Cannabis Cultivation', 'Tramadol Distribution Hub'." },
                    coordinates: {
                        type: Type.OBJECT,
                        properties: {
                            lat: { type: Type.NUMBER },
                            lng: { type: Type.NUMBER }
                        },
                         required: ["lat", "lng"]
                    }
                },
                required: ["id", "name", "riskLevel", "primaryActivity", "coordinates"],
            }
        }
    },
    required: ["metrics", "alerts", "routes", "highRiskZones"]
};


export const generateTraffickingData = async (state: NigerianState): Promise<DashboardData> => {
    const prompt = `
    Generate a realistic but entirely fictional dataset for a drug trafficking detection model focused on ${state} state in Nigeria.
    The data should represent a snapshot of illicit activities, routes, and key metrics.
    - Ensure all geographical coordinates (latitude and longitude) are plausible and fall within the boundaries of ${state}, Nigeria.
    - All monetary values must be in Nigerian Naira (NGN), using the '₦' symbol where appropriate (e.g., '₦15,000,000').
    - Create 4 diverse metrics. One metric must be 'Street Value of Seizures'.
    - Create 5-7 alerts with varying severity. Alerts should mention specific local government areas (LGAs) or known locations within the state.
    - Create 3-5 trafficking routes, including some intrastate routes and some connecting to neighboring states. Name specific towns or areas as start/end points. Include a few waypoints.
    - Create 4-6 high-risk zones located in plausible urban or remote areas within ${state}.
    - Common drugs in the region for context include Tramadol, Cannabis, Cocaine, and Methamphetamine. The activities should reflect this.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });
        
        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);
        
        return data as DashboardData;

    } catch (error) {
        console.error("Error generating data from Gemini:", error);
        throw new Error("Failed to generate trafficking data. The model may be unavailable or the request was malformed.");
    }
};