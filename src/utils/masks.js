
export function maskCPF(value) {
    if (!value) return '';
  
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length <= 3) {
      return cleanedValue;
    } else if (cleanedValue.length <= 6) {
      return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3)}`;
    } else if (cleanedValue.length <= 9) {
      return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6)}`;
    } else {
      return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6, 9)}-${cleanedValue.slice(9, 11)}`;
    }
  }
    
    export function maskPhoneNumber(value) {
      if (!value) return '';
    
      const phoneNumber = value.replace(/\D/g, '');
      if (phoneNumber.length <= 2) {
        return phoneNumber;
      } else if (phoneNumber.length <= 6) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
      } else if (phoneNumber.length <= 10) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`;
      } else {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
      }
    }
    export function formatCurrency(value) {
      return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }
  
    export function formatCurrencyInt(value) {
      const formattedValue = parseFloat(value).toFixed(2).replace('.', ',');
      return `R$ ${formattedValue}`;
    }
  
    export function maskBirthDate(text){
       const formattedDate = text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3');
  
      return formattedDate
    }
  
    export function maskCreditCard(text) {
      const cleanedText = text.replace(/\D/g, '');
      const formattedText = cleanedText.replace(/(\d{4})(?=\d)/g, '$1 ');
    
      return formattedText;
    }
  
    export function maskCep(text) {
      const cep = text
        .replace(/\D/g, '') 
        .replace(/(\d{5})(\d{3})/, '$1-$2');
      return cep;
    }
  
    export function maskMonthYear(text) {
      const cleanedText = text.replace(/\D/g, '');
  
      const formattedText = cleanedText.replace(/(\d{2})(\d{2})/, '$1/$2');
  
      return formattedText;
  }
  