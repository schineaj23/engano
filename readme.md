# Engaño
### Simple scripts for Spanish sites

## El abstracto
With the situation going on in the world, many people must do "distance learning." However, many students forget lessons from class but still need exceptional grades. Fear not! For I have made many scripts that the student can paste into their console with no knowledge required!

## Usage
Copy and paste these into your console in developer tools! The scripts are working, tested and made for Chrome. Your mileage may vary on other browsers.
Some Simple Scripts use a `sleep` command to show off skillz, you don't need this for the all-inclusive scripts.
```
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## All-Inclusive Scripts
These scripts are designed to detect the type of exercise, then solve. With both scripts, the questions must be visible for best effect (i.e this is not an auto-bot)

### ThisIsLanguage
```
fetch('https://raw.githubusercontent.com/schineaj23/engano/master/language.js')
    .then(response => response.text())
    .then(text => eval(text))
    .then(() => { /* Engano injected! */ })
```

### LanguagesOnline
```
fetch('https://raw.githubusercontent.com/schineaj23/engano/master/online.js')
    .then(response => response.text())
    .then(text => eval(text))
    .then(() => { /* Engano injected! */ })
```

## Simple Scripts
### SpanishDict
In progress!

### LearnSpanishFeelGood
```
for(var i=0;i<answer.length;i++){
    document.myform.elements[i].value = answer[i]
    await sleep(500);
}
check();
```

### AprenderEspanol
```
var correct = "¡Correcto!"
for(var i=1;i<qu.length;i++){
    if(fbA[i] === correct){
        FA();
    } else if(fbB[i] === correct){
        FB();
    } else if(fbC[i] === correct){
        FC();
    }
    SQ(1);
    await sleep(500);
}
```