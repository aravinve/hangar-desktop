const IDENTIFIER = '//**//'
const CACHE_INTERVAL = 200000 


const store = (key, value) => {
    const modifiedValue = `${value}${IDENTIFIER}${Date.now().toString()}`
    localStorage.setItem(key, modifiedValue)
}

const validate = (key) => {
    const value = localStorage.getItem(key)
    if(value === null || value === undefined){
        return {
            isValid: false,
            data: null
        }
    }
    const storedValue = value.split(IDENTIFIER)
    const storedTimestamp = Number(storedValue[1])
    if(Number.isNaN(storedTimestamp)){
        return {
            isValid: false,
            data: null
        }
    }
    const storedDate = new Date(storedTimestamp)
    if((Date.now() - storedDate.getTime()) < CACHE_INTERVAL){
        return {
            isValid: true,
            data: storedValue[0]
        }
    }
    localStorage.removeItem(key)
    return {
        isValid: false,
        data: null
    }
}

const hangarFetch = async (key, apiUrl) => {
    const {isValid, data} = validate(key)
    if(isValid && data !== null){
        return JSON.parse(data)
    } else{
        const res = await fetch(apiUrl)
        const jsonData = await res.json()
        store(key, JSON.stringify(jsonData))
        return jsonData
    }
}

export default hangarFetch