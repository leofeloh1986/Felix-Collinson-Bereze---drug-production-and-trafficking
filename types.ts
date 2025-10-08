
export interface Metric {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease' | 'stable';
}

export interface Alert {
    id: string;
    severity: 'High' | 'Medium' | 'Low';
    description: string;
    location: {
        lat: number;
        lng: number;
    };
    timestamp: string;
}

export interface TraffickingRoute {
    id: string;
    riskScore: number;
    startPoint: { lat: number; lng: number; name: string };
    endPoint: { lat: number; lng: number; name: string };
    waypoints: { lat: number; lng: number }[];
    estimatedVolume: string;
}

export interface HighRiskZone {
    id: string;
    name: string;
    riskLevel: 'Critical' | 'High' | 'Moderate';
    primaryActivity: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface DashboardData {
    metrics: Metric[];
    alerts: Alert[];
    routes: TraffickingRoute[];
    highRiskZones: HighRiskZone[];
}

export enum NigerianState {
    Abia = 'Abia',
    Adamawa = 'Adamawa',
    AkwaIbom = 'Akwa Ibom',
    Anambra = 'Anambra',
    Bauchi = 'Bauchi',
    Bayelsa = 'Bayelsa',
    Benue = 'Benue',
    Borno = 'Borno',
    CrossRiver = 'Cross River',
    Delta = 'Delta',
    Ebonyi = 'Ebonyi',
    Edo = 'Edo',
    Ekiti = 'Ekiti',
    Enugu = 'Enugu',
    FCT = 'FCT - Abuja',
    Gombe = 'Gombe',
    Imo = 'Imo',
    Jigawa = 'Jigawa',
    Kaduna = 'Kaduna',
    Kano = 'Kano',
    Katsina = 'Katsina',
    Kebbi = 'Kebbi',
    Kogi = 'Kogi',
    Kwara = 'Kwara',
    Lagos = 'Lagos',
    Nasarawa = 'Nasarawa',
    Niger = 'Niger',
    Ogun = 'Ogun',
    Ondo = 'Ondo',
    Osun = 'Osun',
    Oyo = 'Oyo',
    Plateau = 'Plateau',
    Rivers = 'Rivers',
    Sokoto = 'Sokoto',
    Taraba = 'Taraba',
    Yobe = 'Yobe',
    Zamfara = 'Zamfara',
}