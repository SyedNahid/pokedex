'use strict;'
import mydata from './src/allPokemons.json' assert { type: 'json'};
let insert_poke,newPokes,initialSixteen;
const card=document.getElementById('card--todisplay');
const searchboxVal=document.querySelector('.searchBar');
const randomizerBtn=document.querySelector('.randomizer');
const sortBy=document.getElementById('sort');
const audio = new Audio('/src/humanity.mp3');
const drop=document.querySelector('.advancedseachDropDown');
const advanceSearcDiv=document.querySelector('.advancedSearch');
const typesandWeaknessBtn=document.querySelector('.typesAndWeakSearch');
const typeInput=document.getElementById('type');
const weakInput=document.getElementById('weakness');
const abilities=document.getElementById('abilities-Filter-Bar');
const tempHeight=document.querySelector('.container-flex');
const weight=document.getElementById('weight');
const height=document.getElementById('height');
const restBtn=document.getElementById('resetButton');
const pokemons=mydata;

newPokes=filter(pokemons);//returns unique objects....

function goDFilterWeightandHeight(arr){
    if(height.length && weight.length){
        if(height.value==='small' && weight.value==='heavy'){
            let h1=smallHeights(arr);
            let temp=smallWeightPokes(h1);
            return temp;
        }
        else if(height.value==='small' && weight.value==='heavier'){
            let h1=smallHeights(arr);
            let temp=mediumWeightPokes(h1);
            return temp;
            
        }else if(height.value==='small' && weight.value==='heaviest'){
            let h1=smallHeights(arr);
            let temp=largeWeightsPokes(h1);
            return temp;
        }
        else if(height.value==='medium' && weight.value==='heavy'){
            let h2=mediumHeight(arr);
            let temp=smallWeightPokes(h2);
            return temp;

        }else if(height.value==='medium' && weight.value==='heavier'){
            let h2=mediumHeight(arr);
            let temp=mediumWeightPokes(h2);
            return temp;

        }else if(height.value==='medium' && weight.value==='heaviest'){
            let h2=mediumHeight(arr);
            let temp=largeWeightsPokes(h2);
            return temp;

        }
        else if(height.value==='tall' && weight.value==='heavy'){
            let h3=largeHeights(arr);
            let temp=smallWeightPokes(h3);
            return temp;

        }else if(height.value==='tall' && weight.value==='heavier'){
            let h3=largeHeights(newPokes);
            let temp=mediumWeightPokes(h3);
            return temp;

        }else if(height.value==='tall' && weight.value==='heaviest'){
            let h3=largeHeights(newPokes);
            let temp=largeWeightsPokes(h3);
            return temp;
        }else if(height.value==='small' && weight.value==''){
            let temp=smallHeights(arr);
            return temp;
        }
        else if(height.value==='medium' && weight.value==''){
            let temp=mediumHeight(arr);
            return temp;
        }
        else if(height.value==='tall' && weight.value==''){
            let temp=largeHeights(arr);
            return temp;
        }else if(height.value==='' && weight.value=='heavy'){
            let temp=smallWeightPokes(arr);
            return temp;
        }
        else if(height.value==='' && weight.value=='heavier'){
            let temp=mediumWeightPokes(arr);
            return temp;
        }
        else if(height.value==='' && weight.value=='heaviest'){
            let temp=largeWeightsPokes(arr);
            return temp;
        }
        
    }
    else{
        return 0;
    }

}

drop.addEventListener('click',function(){
    if(advanceSearcDiv.style.display==="none"){
        advanceSearcDiv.style.display="flex";
        drop.textContent="Close";
    }
    else{
     advanceSearcDiv.style.display="none";
     drop.textContent="Advanced Filter";
    }
 });

/* Implementing sort Functionality..... */
pushPokemons(newPokes);
sortBy.addEventListener("change",function(){
    let sorttype=sortBy.value;
    let sortedData,byKey;
   let sorterFunction= function(sorttype,arr){
    if(sorttype==='lowestNumFirst'){
        byKey='number';
        if(byKey == 'number'){
            sortedData = arr.sort(function(a,b){
              return a.number - b.number;
            })
          }
    return sortedData;
        }
        else if(sorttype==='highestNumberFirst'){
            byKey='number';
            if(byKey == 'number'){
                sortedData = arr.sort(function(a,b){
                return b.number - a.number;
            })
          }
    return sortedData;
        }

         else if(sorttype==='A-Z'){
            byKey='name';
            if(byKey == 'name'){
            sortedData = arr.sort(function(a,b){
              let x = a.name.toLowerCase();
              let y = b.name.toLowerCase();
              if(x>y){return 1;}
              if(x<y){return -1;}
              return 0;
            });
          }
    return sortedData;
        }
            else if(sorttype==='Z-A'){
             byKey='name';
             if(byKey == 'name'){
                  sortedData = arr.sort(function(a,b){
                  let x = a.name.toLowerCase();
                  let y = b.name.toLowerCase();
                  if(y>x){return 1;}
                  if(y<x){return -1;}
                  return 0;
            });    
         }
    return sortedData;
    }
 }
 let sortedRes=sorterFunction(sorttype,newPokes);
 pushPokemons(sortedRes);
});

function pushPokemons(arr){
    let typeGG=''
    let pushedUniquePoke=''
    initialSixteen=arr.slice(0,16);
    if(initialSixteen.length<5){
        tempHeight.style.height="340px";
    }else if(initialSixteen.length<=8){
        tempHeight.style.height="680px";
    }
    else if(initialSixteen.length<=12){
        tempHeight.style.height="1360px";
    }
    else if(initialSixteen.length<=16){
        tempHeight.style.height="1250px";
    }
    
    initialSixteen.forEach((item,index)=>{
        let currType= item.type.length;
        if(currType==2){
            typeGG=`<span class="abilities ${item.type[0]}">${item.type[0]}</span><span class="abilities ${item.type[1]}">${item.type[1]}</span>`
        }
        else if(currType==1){
            typeGG=`<span class="abilities ${item.type[0]}">${item.type[0]}</span>`
        }
        insert_poke=`
                <div class="card" id="${index}">
                     <img src="${item.ThumbnailImage}">
                     <p style="position:relative;left:10px;margin-left:10px; margin-bottom:0; font-size:12px;">#${item.number}</p>
                     <h5 style="position:relative;left:10px;margin-left:10px;margin-top:0; font-size:20px;">${item.name}</h5>
                     ${typeGG}
                </div>`
                pushedUniquePoke=pushedUniquePoke+insert_poke;
                card.innerHTML=pushedUniquePoke;
              
});}

/* Since it is required for us to dynamically search the value this event listener is deprecated, Do you if you wanna search by value  */
// searchButton.addEventListener('click',function(e){
//     let localInsert=''
//     let pushedResult=''
//     let pokeToSearch=searchboxVal.value;
//     console.log(pokeToSearch);
//     if(pokeToSearch==''){
//         pushPokemons(newPokes);
//     }
//     else if(pokeToSearch!=''|| Number(pokeToSearch)!=''){
//     pokeToSearch=pokeToSearch[0].toUpperCase()+pokeToSearch.substring(1);
//     console.log(pokeToSearch);
//     newPokes.forEach((item,index)=>{
//         if(pokeToSearch==item.name||Number(pokeToSearch)==item.number){
//                 let currType= item.type.length;
//                 if(currType==2){
//                  typeGG=`<span class="abilities ${item.type[0]}">${item.type[0]}</span> <span class="abilities ${item.type[1]}">${item.type[1]}</span>`
//                  }
//                 else if(currType==1){
//                  typeGG=`<span class="abilities ${item.type[0]}">${item.type[0]}</span>`
//                 }
//                 localInsert=`<div class="card" >
//                                 <img src="${item.ThumbnailImage}" class="img-card">
//                                 <p style="position:relative;left:10px;margin-left:10px; margin-bottom:0; font-size:12px;">#${item.number}</p>
//                                 <h5 style="position:relative;left:10px;margin-left:10px;margin-top:0; font-size:20px;">${item.name}</h5>
//                                 ${typeGG}
//                             </div>`
//                 pushedResult=pushedResult+localInsert;
//                 card.innerHTML=pushedResult;
//                 pushedResult=''
//                 searchboxVal.value='';
                
//         }
//         });
//     } 
// });

function filter(pokemons){
    let objName;
    let uniquePokemons = [];
    let uniquePokeObject = {};
    for (let i in pokemons) {
    // Extract the name
    objName = pokemons[i]['name']; 
    // Use the name as the index
    uniquePokeObject[objName] = pokemons[i];
}
// Loop to push unique object into array
for (let i in uniquePokeObject) {
    uniquePokemons.push(uniquePokeObject[i]);
}
return uniquePokemons;
}

randomizerBtn.addEventListener('click',function(){
    audio.play(); // disabled for the purpose of Humanity....
    let temp=[];
    let randomPokes=[];
    let pokeExtract=[];
    let random;
    while(temp.length<16){
        random=Math.trunc(Math.random()*905)+1;
        if(temp.includes(random)){
            continue;
        }else{
             temp.push(random);
        }
    }

    for(let i=0;i<16;i++){
    randomPokes[i]=newPokes.filter(obj=>{return obj.number==temp[i]}); //filtering objects bases on my random numbers.
    };
    for(let j=0;j<randomPokes.length;j++){
        pokeExtract[j]=randomPokes[j][0];
    }
    pushPokemons(pokeExtract);
    
});

searchboxVal.addEventListener('input',function(e){ 
    let value=e.target.value;
    let currVal='';
    if(value==''){
        pushPokemons(newPokes);
    }
    else{
    let dynRes=[];
    if(Number(value)){
        if(value.length==1){
            currVal='00'+value;
        }
        else if(value.length==2){
            currVal='0'+value;
        }
        else if(value.length==3){
            currVal=value;
        }
    }
    else if(value.length==1){currVal=value[0].toUpperCase();}
    else if(value.length>1){
        currVal=value[0].toUpperCase()+value.slice(1,value.length+1);
    }
    for(let i=0;i<newPokes.length;i++){
        if(newPokes[i].name.includes(currVal)||newPokes[i].number.includes(currVal)){
            dynRes.push(newPokes[i]);
        }
    }
    pushPokemons(dynRes);
    }
});


typesandWeaknessBtn.addEventListener('click',function(){
    let types=[];
    let weak=[];
    let itemTypes;
    let itemWeaks;
    let tempres = newPokes;
    for (let option of typeInput.options)
    {   if(option.value=='all'){
        while(types.length>0)types.pop();
        }
        else if (option.selected) {
            types.push(option.value);
        }
    }
    for (let option of weakInput.options)
    {    if(option.value=='none'){
        while(weak.length>0)weak.pop(); }
        else if (option.selected) {
            weak.push(option.value);
        }
    }


    if(types.length>0 ||types.length==0){
        tempres=tempres.filter((item)=> {
        itemTypes=item.type;
            let isTrue=types.every((element)=>itemTypes.includes(element));
            if(isTrue){
            return item;
            }})
        pushPokemons(tempres);
        }
    if(weak.length>0 || weak.length==0){
        tempres=tempres.filter(item=>{
            itemWeaks=item.weakness;
            let isTrue=weak.every((element)=>itemWeaks.includes(element));
            if(isTrue){
            console.log(item);
            return item;}
        })
        pushPokemons(tempres);
    }
    if(abilities.value){
        tempres=tempres.filter(item=>{
            let itemAbil=item.abilities;
            if(itemAbil.includes(abilities.value)){
                return item;}
    })
    pushPokemons(tempres);
    }
    if(height.value){
        tempres=goDFilterWeightandHeight(tempres);
        pushPokemons(tempres);
    }
    if(weight.value){
        tempres=goDFilterWeightandHeight(tempres);
        pushPokemons(tempres);
    }
    else if(tempres.length==0){
        errorMessageDisplay();
    }
    sortBy.addEventListener("change",function(){
        let sorttype=sortBy.value;
        let sortedData,byKey;
       let sorterFunction= function(sorttype,arr){
        if(sorttype==='lowestNumFirst'){
            byKey='number';
            if(byKey == 'number'){
                sortedData = arr.sort(function(a,b){
                  return a.number - b.number;
                })
              }
        return sortedData;
            }
            else if(sorttype==='highestNumberFirst'){
                byKey='number';
                if(byKey == 'number'){
                    sortedData = arr.sort(function(a,b){
                    return b.number - a.number;
                })
              }
        return sortedData;
            }
    
             else if(sorttype==='A-Z'){
                byKey='name';
                if(byKey == 'name'){
                sortedData = arr.sort(function(a,b){
                  let x = a.name.toLowerCase();
                  let y = b.name.toLowerCase();
                  if(x>y){return 1;}
                  if(x<y){return -1;}
                  return 0;
                });
              }
        return sortedData;
            }
                else if(sorttype==='Z-A'){
                 byKey='name';
                 if(byKey == 'name'){
                      sortedData = arr.sort(function(a,b){
                      let x = a.name.toLowerCase();
                      let y = b.name.toLowerCase();
                      if(y>x){return 1;}
                      if(y<x){return -1;}
                      return 0;
                });    
             }
        return sortedData;
        }
     }
     let sortedRes=sorterFunction(sorttype,tempres);
     pushPokemons(sortedRes);
    });
    restBtn.addEventListener('click',function(){
        abilities.value='';
        weight.value='';
        height.value='';
      });
});



function smallHeights(arr){
    const smallheightGG=arr.filter(item=>{
        if (item.height<45){
            return item;
        }
    })
    return smallheightGG;
}
function mediumHeight(arr){
    const mediumPokesGG=arr.filter(item=>{
        if((50<item.height)&&(item.height<139)){
            return item;
        }
    })
    return mediumPokesGG;
}
function largeHeights(arr){
    const largeheightGG=arr.filter(item=>{
        if ((140<item.height)&&(item.height<3000)){
            return item;
        }
    })
    return largeheightGG;
}
function smallWeightPokes(arr){
    const smallWeightPokesGG=arr.filter(item=>{
        if((item.weight<110)){
            return item;
        }
    })
    return smallWeightPokesGG;
}
function mediumWeightPokes(arr){
    const mediumWeightsPokesGG=arr.filter(item=>{
        if((110<item.weight)&&(item.weight<200)){
            return item;
        }
    })
    return mediumWeightsPokesGG;
}
function largeWeightsPokes(arr){
    const largeWeightGG=arr.filter(item=>{
        if (item.weight>2000){
            return item;
        }
    })
    return largeWeightGG;
}
function errorMessageDisplay(){
    let insert_error;
    insert_error=`
    <div class="errorMessage">
        <h1 style="margin:0; position:relative; right:165px;">No Pokémon Matched your search</h1>
        <p><strong>Try these suggestions to find a Pokémon:</strong></p>
        <ul>
        <li><p>Reduce the number of search parameters</p></li>
        <li><p>Search for only one Pokémon type at a time</p></li>
        <li><p>Try multiple body sizes and shapes</p></li> 
        </ul>
    </div>`
    card.innerHTML=insert_error;
}
