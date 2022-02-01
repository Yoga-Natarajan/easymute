
 
async function getAudibletabs(){
    let queryOptions = { audible: true};
    chrome.tabs.query(queryOptions).then( (result) => {
        // document.getElementById("cont2").style.visibility="hidden";

        const map = new Map();
        if(result.length > 0) { 
             
            var newUL = document.createElement("ul");
            newUL.id = "list";

            for(var x =0; x < result.length; x++){
                            
                var newItem = document.createElement("li");   
                newItem.id = "" + x;
                map.set(newItem.id, result[x].id);
                newItem.innerHTML = result[x].title;                
                newUL.appendChild(newItem);
                if(result[x].mutedInfo.muted){ // muted
                    newItem.style.backgroundColor = '#e5e5e5';
                    newItem.className = "muted";
                }
                else{ //unmuted
                    newItem.style.backgroundColor = '#faf5f5';
                    newItem.className = "unmuted";

                }
            }    

            document.getElementById("tabs").appendChild(newUL);             
            document.getElementById("list").addEventListener("click", function(e) {
                
                if (e.target.nodeName === 'LI') {                   
                    console.log(e.target.nodeName);
                    var elem = map.get(e.target.id);
                    chrome.tabs.get(elem, async (tab) => {
                        
                        let muted = !tab.mutedInfo.muted;
                        await chrome.tabs.update(elem, { muted });
                        console.log(`Tab ${elem} is ${ muted ? 'muted' : 'unmuted' }`);
                        if(muted){ 
                            console.log(e.target.id);
                            document.getElementById(e.target.id).style.backgroundColor = '#e5e5e5';
                            e.target.className = "muted";
                            // newItem.innerHTML = "li.unmuted:after {background-image: url('/images/muted3.png'); background-size: 20px 20px; background-repeat: no-repeat; display: block; width: 20px;  height: 20px;  content:"";}";

                        }
                        else{ // unmuted
                            document.getElementById(e.target.id).style.backgroundColor = '#faf5f5';
                            e.target.className = "unmuted";
        
                        }
                    });
                }
              });
            


        }
        else{
            document.getElementById("tabs").innerHTML = "No audible tabs!";
            document.getElementById("tabs").style.textAlign = 'center'; 
            document.getElementById("tabs").style.padding = '10px'; 
        }
        
        
    })
    
}

document.addEventListener("DOMContentLoaded", getAudibletabs());



