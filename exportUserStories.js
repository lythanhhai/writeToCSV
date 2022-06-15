let json = require('/home/binbin/University/semester2_2122/AAVN/jsonformatter.json');

var cardsName = []
var cardsDesc = []
var cardsId = []
var itemsName = []

for(let i = 0; i < json["cards"].length; i++)
{
    if(json["cards"][i].closed !== true)
    {
        cardsName.push(json["cards"][i].name)
        cardsDesc.push(json["cards"][i].desc)
        cardsId.push(json["cards"][i].id)

        // console.log(json["cards"][i]);
    }
}

for(let i = 0; i < cardsId.length; i++)
{   
    // console.log(cardsId[i])
    // console.log(json["checklists"][i]["idCard"])
    for(let k = 0; k < json["checklists"].length; k++)
    {
        if(json["checklists"][k]["idCard"] === cardsId[i])
        {
            console.log(cardsName[i])
            console.log(".................")
            console.log(cardsDesc[i])
            console.log("+++++++++++++++++")

            let itemPerCard = []
            for(let j = 0; j < json["checklists"][k]["checkItems"].length; j++)
            {
                console.log(json["checklists"][k]["checkItems"][j].name);
                itemPerCard.push(json["checklists"][k]["checkItems"][j].name)
                // itemPerCard += json["checklists"][k]["checkItems"][j].name + "\n"
            }
            itemsName.push(itemPerCard)

            //     itemsName = json["checklists"][k]["checkItems"].map((item, index) => {
            //        return (item[index].name);
            //     })
            
            console.log("-----------------")

            break
        }
    }
}
// console.log(itemsName)

function mergeList(itemsName)
{
    let String = ""
    for(let i = 0; i < itemsName.length; i++)
    {
        String += itemsName[i] + "\n"
    }   
    return String;
}

var fs = require('fs');
var data = {}
data.table = []
for (i = 0; i < 21; i++){
   let descConvert = cardsDesc[i].split("\n")[0] + `\n`
    + cardsDesc[i].split("\n")[1] + `\n`
    + cardsDesc[i].split("\n")[2]
    console.log(descConvert)
   var obj = {
       id: cardsId[i],
       name: cardsName[i],
       desc: descConvert,
       userStories: mergeList(itemsName[i])
   }
   // console.log(obj)
   data.table.push(obj)
}

// var a = mergeList(itemsName[0])
// console.log(a)

fs.writeFile ("output.json", JSON.stringify(data), function(err) {
    if (err) throw err;
        console.log('complete');
    }
);

function handleData() 
{
    var data = []
    var row = []
    row.push("Id Card")
    row.push("Name")
    row.push("Description")
    row.push("User Stories")
    data.push(row)
    for (i = 0; i < 21; i++)
    {
        row = []
        let descConvert = cardsDesc[i].split("\n")[0] + "\n"
            + cardsDesc[i].split("\n")[1] + "\n"
            + cardsDesc[i].split("\n")[2]

        row.push(cardsId[i])
        row.push(cardsName[i])
        row.push(descConvert)
        row.push(mergeList(itemsName[i]))

        data.push(row)
    }
    return data
}
console.log(handleData())

var csv = require('csv');

var obj = csv();

obj.from.array(handleData()).to.path('./output.csv');


// console.log(count)
// for(let k = 0; k < json["checklists"].length; k++)
// {
//     console.log(json["checklists"][k]["idCard"])
// }


// console.log("................")

// console.log(json["cards"][0])
// console.log(json["checklists"]["checkItems"].length)