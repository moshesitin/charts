import axios from 'axios';

export const fetchChartData = async (endpoint, params, authData) => {
    try {
        const requestData = {
            ...params,
            UserId: parseInt(authData.UserId, 10) || 2
        };
        
        const response = await axios.post(
            `${authData.url}/${endpoint}`,
            {
                username: authData.user,
                password: authData.password,
                data: requestData
            },
            { headers: { 'Content-Type': 'application/json' } }
        );
        
        console.log(`Ответ от ${endpoint}:`, response.data);
        
        return response.data.ResData || [];
    } catch (error) {
        console.error(`Ошибка при получении данных для ${endpoint}:`, error);
        if (error.response) {
            console.error("Ответ сервера:", error.response.data);
        }
        throw error;
    }
};

const createParams = (filters) => ({
    StartDate: filters.startDate || new Date().toISOString().split('T')[0],
    EndDate: filters.endDate || new Date().toISOString().split('T')[0],
    GroupBy: filters.groupBy || 'MONTH',
    ...(filters.City && { City: filters.City }),
    ...(filters.AgencyId && { AgencyId: filters.AgencyId }),
    ...(filters.ClusterId && { ClusterId: filters.ClusterId }),
    ...(filters.SubCluster && { SubCluster: filters.SubCluster }),
    ...(filters.LineType && { LineType: filters.LineType }),
    ...(filters.LineId && { LineId: filters.LineId }),
    ...(filters.linegroup && { linegroup: filters.linegroup })
});

export const fetchPlanVsPerformance = async (filters, authData) => {
    const params = createParams(filters);
    return fetchChartData('TripsPlannedVSPerformed', params, authData);
};

export const fetchPerformancePercentage = async (filters, authData) => {
    const params = createParams(filters);
    return fetchChartData('TripsPlannedVSPerformedPercentage', params, authData);
};

export const fetchPlannedTrips = async (filters, authData) => {
    const params = createParams(filters);
    return fetchChartData('TripsPlanned', params, authData);
};

export const fetchLinePerformanceDetails = async (filters, authData) => {
    const params = {
        ...createParams(filters),
        UserId: parseInt(authData.UserId, 10) || 2
    };
    return fetchChartData('PerformanceDetailsForLine', params, authData);
};

export const fetchPlannedChanges = async (filters, authData) => {
    const params = createParams(filters);
    return fetchChartData('TripsPlannedChanges', params, authData);
};