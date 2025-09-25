class Regex {
    static get phoneNumber() {
        return /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/
    } 
}
export default Regex