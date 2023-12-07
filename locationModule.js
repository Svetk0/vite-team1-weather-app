

// Функция получения текущего местоположения пользователя
export async function getCurrentLocation() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error)
            );
        });

        const { latitude, longitude } = position.coords;
        return { latitude, longitude };

    } catch (error) {
        console.error('Ошибка при получении местоположения:', error);
        throw error;
    }
}

