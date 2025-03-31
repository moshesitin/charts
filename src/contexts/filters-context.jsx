import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

// Начальные даты для фильтров
const currentDate = new Date();
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

export const FiltersContext = createContext();

export const useFilters = () => {
    const context = useContext(FiltersContext);
    if (!context) {
        throw new Error('useFilters must be used within a FiltersProvider');
    }
    return context;
};

export const FiltersProvider = ({ children }) => {
    const url = import.meta.env.VITE_URL;
    const userId = import.meta.env.VITE_USERID;
    const user = import.meta.env.VITE_USER;
    const password = import.meta.env.VITE_PASSWORD;
    
    // Хранилище для опций каждого фильтра
    const [filterOptions, setFilterOptions] = useState({});
    
    // Текущие выбранные значения фильтров
    const [selectedFilters, setSelectedFilters] = useState({
        Agency: '',
        Cluster: '',
        SubCluster: '',
        City: '',
        RouteNumber: '',
        LineType: '',
        linegroup: '',
        StartDate: threeMonthsAgo.toISOString().split('T')[0],
        EndDate: currentDate.toISOString().split('T')[0]
    });
    
    // Состояние загрузки для каждого фильтра
    const [isLoading, setIsLoading] = useState({});
    
    // Общая ошибка
    const [error, setError] = useState(null);
    
    // Маппинг между ID фильтра и полем API
    const apiFieldMapping = {
        'Agency': 'AgencyId',
        'Cluster': 'ClusterId',
        'SubCluster': 'SubCluster', 
        'City': 'City',
        'RouteNumber': 'LineID',
        'LineType': 'LineType',
        'linegroup': 'linegroup'
    };
    
    // Функция загрузки опций для конкретного фильтра
    const loadFilterOptions = useCallback(async (filterType) => {
        // Если уже загружаем - не делаем повторный запрос
        if (isLoading[filterType]) return;
        
        setIsLoading(prev => ({ ...prev, [filterType]: true }));
        setError(null);
        
        try {
            const reqData = {
                UserId: userId,
                SelectChoice: filterType
            };
            
            // Добавляем выбранные фильтры к запросу
            Object.entries(selectedFilters).forEach(([key, value]) => {
                if (value && key in apiFieldMapping) {
                    reqData[apiFieldMapping[key]] = value;
                }
            });
            
            // Добавляем даты если есть
            if (selectedFilters.StartDate) reqData.StartDate = selectedFilters.StartDate;
            if (selectedFilters.EndDate) reqData.EndDate = selectedFilters.EndDate;
            
            const response = await axios.post(
                `${url}/UsersChoice`, 
                {
                    userName: user,
                    password: password,
                    data: reqData
                }
            );
            
            // Проверяем наличие данных, а не статус
            if (response.data.ResData) {
                setFilterOptions(prev => ({
                    ...prev,
                    [filterType]: response.data.ResData || []
                }));
            } else if (response.data.Status === "OK" && response.data.Msg === "הפעולה הצליחה") {
                // Если пришло сообщение об успехе, но нет данных - устанавливаем пустой массив
                setFilterOptions(prev => ({
                    ...prev,
                    [filterType]: []
                }));
            } else {
                // В случае других ситуаций - обрабатываем как ошибку
                throw new Error(response.data.Msg || 'Ошибка загрузки данных');
            }
        } catch (err) {
            console.error(`Ошибка при загрузке ${filterType}:`, err);
            
            // Не устанавливаем ошибку, если это "успешная операция"
            if (err.message !== "הפעולה הצליחה") {
                setError(err.message || 'Произошла ошибка при загрузке фильтров');
            } else {
                // Если это сообщение об успешной операции, но нет данных - устанавливаем пустой массив
                setFilterOptions(prev => ({
                    ...prev,
                    [filterType]: []
                }));
            }
        } finally {
            setIsLoading(prev => ({ ...prev, [filterType]: false }));
        }
    }, [url, userId, user, password, selectedFilters, isLoading, apiFieldMapping]);
    
    // Обработчик фокуса на фильтре
    const handleFilterFocus = useCallback((filterType) => {
        if (!filterOptions[filterType]) {
            loadFilterOptions(filterType);
        }
    }, [filterOptions, loadFilterOptions]);
    
    // Обработчик изменения фильтра
    const handleFilterChange = useCallback((e) => {
        const { id, value } = e.target;
        
        // Обновляем выбранный фильтр
        setSelectedFilters(prev => ({
            ...prev,
            [id]: value
        }));
        
        // Определяем зависимые фильтры для сброса
        let filtersToReset = {};
        
        switch(id) {
            case 'Agency':
                filtersToReset = { 
                    Cluster: '', SubCluster: '', 
                    City: '', RouteNumber: '', linegroup: '' 
                };
                break;
            case 'Cluster':
                filtersToReset = { 
                    SubCluster: '', City: '', 
                    RouteNumber: '', linegroup: '' 
                };
                break;
            case 'SubCluster':
                filtersToReset = { 
                    City: '', RouteNumber: '', linegroup: '' 
                };
                break;
            case 'City':
                filtersToReset = { 
                    RouteNumber: '', linegroup: '' 
                };
                break;
            case 'LineType':
                filtersToReset = { 
                    RouteNumber: '', linegroup: '' 
                };
                break;
            default:
                filtersToReset = {};
        }
        
        // Сбрасываем зависимые фильтры
        if (Object.keys(filtersToReset).length) {
            setSelectedFilters(prev => ({
                ...prev,
                ...filtersToReset
            }));
            
            // Сбрасываем кэшированные опции для зависимых фильтров
            Object.keys(filtersToReset).forEach(filterKey => {
                const apiFilterType = filterKey === 'RouteNumber' ? 'LineID' : 
                                      filterKey === 'City' ? 'Cities' : filterKey;
                
                setFilterOptions(prev => ({
                    ...prev,
                    [apiFilterType]: undefined
                }));
            });
        }
    }, []);
    
    // Применить фильтр (для будущего использования в запросах данных)
    const applyFilters = useCallback(() => {
        // Здесь логика применения фильтров для запроса данных
        return { ...selectedFilters };
    }, [selectedFilters]);
    
    // Сбросить все фильтры кроме дат
    const resetFilters = useCallback(() => {
        setSelectedFilters(prev => ({
            Agency: '',
            Cluster: '',
            SubCluster: '',
            City: '',
            RouteNumber: '',
            LineType: '',
            linegroup: '',
            StartDate: prev.StartDate,
            EndDate: prev.EndDate
        }));
        
        // Очищаем кэш опций
        setFilterOptions({});
    }, []);
    
    return (
        <FiltersContext.Provider value={{
            filterOptions,
            selectedFilters,
            isLoading,
            error,
            handleFilterFocus,
            handleFilterChange,
            applyFilters,
            resetFilters
        }}>
            {children}
        </FiltersContext.Provider>
    );
};