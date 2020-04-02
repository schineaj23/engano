# Engaño
### Simple scripts for Spanish sites

## El abstracto
With the situation going on in the world, many people must do "distance learning." However, many students forget lessons from class but still need exceptional grades. Fear not! For I have made many scripts that the student can paste into their console with no knowledge required!

## Usage
Most scripts use a `sleep` command to show your immense skills, but this isn't needed. Paste this in before the main script for best effect.
```
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```


### SpanishDict
In progress!

### LanguagesOnline
```
var correct = "Muy bien";
for(var i=0;i<I.length;i++){
    for(var j=0;j<3;j++) {
        var Feedback = I[i][3][j][1];
        if(Feedback == correct){
            var id = 'Q_' + i + '_'+ j + '_Btn';
            console.log(i + ' ' + id + ' ' + Feedback);
            document.getElementById(id).click();
        }
    }
    await sleep(500);
    ChangeQ(1);
}
```

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