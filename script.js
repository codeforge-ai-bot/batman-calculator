let current = '';
let previous = '';
let operator = null;
let result = null;

function updateDisplay(val){
  const screen = document.getElementById('screen');
  screen.textContent = val;
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    if('0123456789.'.includes(val)){
      current += val;
      updateDisplay(current);
    } else if(['+','-','*','/'].includes(val)){
      if(current === '' && result != null){
        operator = val;
        previous = String(result);
        current = '';
      } else if(current !== ''){
        if(result == null){
          result = parseFloat(current);
        } else {
          // compute
          const a = result;
          const b = parseFloat(current);
          switch(operator){
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = b !== 0 ? a / b : 'Error'; break;
          }
        }
        operator = val;
        previous = String(result);
        current = '';
        updateDisplay(previous);
      }
    } else if(val === '='){
      if(current !== '' && result != null && operator){
        const b = parseFloat(current);
        switch(operator){
          case '+': result = result + b; break;
          case '-': result = result - b; break;
          case '*': result = result * b; break;
          case '/': result = b !== 0 ? result / b : 'Error'; break;
        }
        updateDisplay(String(result));
        current = '';
        operator = null;
        previous = '';
      }
    } else if(val === 'C'){
      current = '';
      previous = '';
      operator = null;
      result = null;
      updateDisplay('0');
    }
  });
});
