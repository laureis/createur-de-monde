window.onload = function() {
    nav();
    update();
    create();
    postit();
}

function postit() {
    dragElement(document.getElementById("postit1"));
    $('#postit1 .close').click(function() {
        $('#postit1').addClass('hidden');
    });
    dragElement(document.getElementById("postit2"));
    $('#postit2 .close').click(function() {
        $('#postit2').addClass('hidden');
    });
}
function nav() {
  $('#navCreator').click(function() {
        $('#creator').removeClass('hidden');
        $('#update_form').addClass('hidden');
    });
    $('#navModifier').click(function() {
        $('#creator').addClass('hidden');
        $('#update_form').removeClass('hidden');
    });
}


function create(world) {
    $("#creator").submit(function (e) {
        newWorld($('input[name=inspi]:checked').val(), $( "input[type=text][name=newName]" ).val());
        return false;
    });
}


function update() {
    $("#update_form").submit(function (e) {
        generateUpdateForm($('input[name=name_update]:checked').val());
        return false;
    });
}

function generateUpdateForm(name) {
    $('#worldToUpdate').html('<fieldset id="fieldsetUpdate"><legend>Modification du monde '+name+'</legend></fieldset>');
    addBuilding(name);
    addObject(name);
    addCharacter(name);
}

function addBuilding(worldName) {
    $('#fieldsetUpdate').append("<p id='addBuilding'>Ajouter une structure building</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", "buildingFile");
    $('#addBuilding').append(x);
    $('#addBuilding').append('<br /><input type="submit" id="submit_building" value="ajouter">');
    $('#submit_building').click(function() {
        save(worldName, $('#buildingFile').val());
        return false;
    });
}

function addObject(name) {
    $('#fieldsetUpdate').append("<p id='addObject'>Ajouter un objet</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    $('#addObject').append(x);
    $('#addObject').append('<br /><input type="submit" id="submit_object" value="ajouter">');
}

function addCharacter(name) {
    $('#fieldsetUpdate').append("<p id='addCharacter'>Ajouter un personnage</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    $('#addCharacter').append(x);
    $('#addCharacter').append('<br /><input type="submit" id="submit_character" value="ajouter">');
}

function save(worldName, fileName, type) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.CopyFile(fileName, "C:\\Users\\moi\\Desktop\\newImage.png", true);
    console.log("File is copied successfully");
}

function newWorld(inspiration, world) {

    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.CopyFolder("C:\\Users\\moi\\Desktop\\decalage\\Decalage\\Assets\\Resources\\"+inspiration, "C:\\Users\\moi\\Desktop\\decalage\\Decalage\\Assets\\Resources\\"+world, false);
    console.log("World created successfully");
}

function dragElement(elmnt) {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
}


function createDoor(world) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.CopyFile("C:\\Users\\moi\\Desktop\\newImage.png", "C:\\Users\\moi\\Desktop\\newImage.png", true);
    console.log("File is copied successfully");
}

function printWorlds(directory) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    var worldFile = object.OpenTextFile("C:\\path-to\\worlds.txt", 1, false);

    var line;
    while(!worldFile.AtEndOfStream) {
        line = worldFile.ReadLine();
        /* afficher chaque monde */
        console.log(line);
    }
    worldFile.Close();

}