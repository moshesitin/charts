import axios from 'axios';

export const fetchChartData = async (endpoint, params, authData) => {
    try {
        // ОБЯЗАТЕЛЬНО: Добавляем UserId из authData в params и преобразуем в число
        const requestData = {
            ...params,
            UserId: parseInt(authData.UserId, 10) || 2 // Обеспечиваем числовой тип
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

// Получение данных плана/выполнения (תכנון / ביצוע)
export const fetchPlanVsPerformance = async (filters, authData) => {
    const params = {
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
    };
    
    return fetchChartData('TripsPlannedVSPerformed', params, authData);
};

// Получение данных процента выполнения (אחוז ביצוע)
export const fetchPerformancePercentage = async (filters, authData) => {
    const params = {
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
    };
    
    return fetchChartData('TripsPlannedVSPerformedPercentage', params, authData);
};

// Получение данных о запланированных поездках (סוג נסיעות מתוכנן)
export const fetchPlannedTrips = async (filters, authData) => {
    const params = {
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
    };
    
    return fetchChartData('TripsPlanned', params, authData);
};

// Получение данных о деталях выполнения по линиям
export const fetchLinePerformanceDetails = async (filters, authData) => {
    const params = {
        StartDate: filters.startDate || new Date().toISOString().split('T')[0],
        EndDate: filters.endDate || new Date().toISOString().split('T')[0],
        UserId: parseInt(authData.UserId, 10) || 2, // Явное указание числового UserId
        ...(filters.City && { City: filters.City }),
        ...(filters.AgencyId && { AgencyId: filters.AgencyId }),
        ...(filters.ClusterId && { ClusterId: filters.ClusterId }),
        ...(filters.SubCluster && { SubCluster: filters.SubCluster }),
        ...(filters.LineType && { LineType: filters.LineType }),
        ...(filters.LineId && { LineId: filters.LineId }),
        ...(filters.linegroup && { linegroup: filters.linegroup })
    };
    
    return await fetchChartData('PerformanceDetailsForLine', params, authData);
};

// Получение данных о запланированных изменениях
export const fetchPlannedChanges = async (filters, authData) => {
    const params = {
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
    };
    
    return fetchChartData('TripsPlannedChanges', params, authData);
};