
const SEPARATOR = '//**//'
//saving cache for 5 minutes
const CACHE_TIME = 1000 * 60 * 5

const setupCache = () => {
    localStorage.clear()
}

const store = (key, value) => {
    const finalValue = `${value}${SEPARATOR}${Date.now().toString()}`
    localStorage.setItem(key, finalValue)
}

const isValid = (key) => {
    const value = localStorage.getItem(key)
    if (value === null) {
        return {
            isValid : false,
        }
    }

    const values = value.split(SEPARATOR)
    const timestamp = Number(values[1])
    if (Number.isNaN(timestamp)) {
        return {
            isValid : false,
        }
    }

    const date = new Date(timestamp)

    if (date.toString() === 'Invalid Date') {
        return {
            isValid : false,
        }
    }

    if ((Date.now() - date.getTime()) < CACHE_TIME) {
        return {
            isValid : true,
            value : values[0],
        }
    }
    localStorage.removeItem(key)
    return {
        isValid : false,
    }
}

export const cache = { isValid, store, setupCache }