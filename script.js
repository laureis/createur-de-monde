window.onload = function() {
    nav();
    updateForm();
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


function newWorld(inspiration, world) {

    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.CopyFolder("C:\\Users\\moi\\Desktop\\decalage\\Decalage\\Assets\\Resources\\"+inspiration, "C:\\Users\\moi\\Desktop\\decalage\\Decalage\\Assets\\Resources\\"+world, false);
    console.log("World created successfully");
}

function dragElement(elmnt) {

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
}


/* WORLD UPDATE GENERAL FUNCTIONS */

function updateForm() {
     $("#update_form").submit(function () {
        generateUpdateForm($('input[name=name_update]:checked').val());
        return false;
    });
}

function generateUpdateForm(name) {
    generateUpdateFormMenu();
    $('#worldToUpdate').append('<fieldset id="fieldsetUpdate"><legend>Modification du monde '+name+'</legend></fieldset>');
    generateUpdateAddForm(name, true);
    generateUpdateDeleteForm(name, false);
    generateUpdateListForm(name, false);
}

function generateUpdateFormMenu() {
    $('#worldToUpdate').html('<nav><ul>'
        + '<li id="navUpdateAdd" class="active">Ajouter</li>'
        + '<li id="navUpdateDelete">Supprimer</li>'
        + '<li id="navUpdateList">Voir</li>'
        + '</ul></nav>');
    navigationUpdateFormMenu();
}

function navigationUpdateFormMenu() {
	$('#navUpdateAdd').click(function() {
        $('#updateAddForm').removeClass('hidden');
        $('#updateDeleteForm').addClass('hidden');
        $('#updateListForm').addClass('hidden');
    });
    $('#navUpdateDelete').click(function() {
        $('#updateAddForm').addClass('hidden');
        $('#updateDeleteForm').removeClass('hidden');
        $('#updateListForm').addClass('hidden');
    });
    $('#navUpdateList').click(function() {
        $('#updateAddForm').addClass('hidden');
        $('#updateDeleteForm').addClass('hidden');
        $('#updateListForm').removeClass('hidden');
    });
}


/* UPDATE_ADD PAGE */

function generateUpdateAddForm(name, display) {
    $('#fieldsetUpdate').append("<div id='updateAddForm' class='hidden'></div>");
    if (display) $('#updateAddForm').removeClass('hidden');
    else $('#updateAddForm').addClass('hidden');
    addBuilding(name);
    addObject(name);
}

function addBuilding(worldName) {
    $('#updateAddForm').append("<p id='addBuilding'>Ajouter une structure building</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", "buildingFile");
    $('#addBuilding').append(x);
    $('#addBuilding').append('<br /><input type="submit" id="submit_building" value="ajouter">');
    $('#submit_building').click(function() {
        saveFile(type, worldName, $('#buildingFile').val());
        return false;
    });
}

function addObject(worldName) {
    $('#updateAddForm').append("<p id='addObject'>Ajouter un objet</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", "objectFile");
    $('#addObject').append(x);
    $('#addObject').append('<br /><input type="submit" id="submit_object" value="ajouter">');
    $('#submit_object').click(function() {
        saveFile(type, worldName, $('#objectFile').val());
        return false;
    });
}


/* UPDATE_DELETE PAGE */

function generateUpdateDeleteForm(name, display) {
    $('#fieldsetUpdate').append("<div id='updateDeleteForm' class='hidden'></div>");
    if (display) $('#updateDeleteForm').removeClass('hidden');
    else $('#updateDeleteForm').addClass('hidden');
    deleteBuilding(name);
    deleteObject(name);
}

function deleteBuilding(worldName) {
    $('#updateDeleteForm').append("<p id='deleteBuilding'>Supprimer une structure building</p>");
    $('#deleteBuilding').append('<br /><input type="submit" id="submit_delete_building" value="supprimer">');
    $('#submit_delete_building').click(function() {
        delete(name);
        return false;
    });
}

function deleteObject(name) {
    $('#updateDeleteForm').append("<p id='deleteObject'>Supprimer une structure building</p>");
    $('#deleteObject').append('<br /><input type="submit" id="submit_delete_object" value="supprimer">');
    $('#submit_delete_building').click(function() {
        delete(name);
        return false;
    });
}

/* UPDATE_LIST PAGE */

function generateUpdateListForm(name, display) {   
    $('#fieldsetUpdate').append("<div id='updateListForm' class='hidden'></div>"); 
    if (display) $('#updateListForm').removeClass('hidden');
    else $('#updateListForm').addClass('hidden');
    listBuildings(name);
    listObjects(name);
}

function listBuildings(worldName) {
    $('#updateListForm').append("<p id='listBuildings'>Liste des stuctures</p>");
}

function listObjects(name) {
    $('#updateListForm').append("<p id='listObjects'>Liste des objets</p>");
}

/* GENERAL UPDATE FUNCTIONS */

function create(world) {
    $("#creator").submit(function (e) {
        newWorld($('input[name=inspi]:checked').val(), $( "input[type=text][name=newName]" ).val());
        return false;
    });
}

function saveFile(worldName, fileName, type) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.CopyFile(fileName, "C:\\Users\\moi\\Desktop\\newImage.png", true);
    console.log("File is copied successfully");
}

function printWorlds(worldsTxt) {
    worldsTxt = "C:\\path-to\\worlds.txt"
    var object = new ActiveXObject("Scripting.FileSystemObject");
    var worldFile = object.OpenTextFile(worldsTxt, 1, false);

    var line;
    while(!worldFile.AtEndOfStream) {
        line = worldFile.ReadLine();
        /* afficher chaque monde */
        console.log(line);
    }
    worldFile.Close();
}

function printDirectory(directory) {
    directory = "C:\\path-to\\folder"
    var object = new ActiveXObject("Scripting.FileSystemObject");
    var folder = object.GetFolder(directory);
    var fc = new Enumerator(folder.files);

    for (; !fc.atEnd(); fc.moveNext()) {
        /* afficher chaque fichier */
        console.log(fc.item().Name);
    }
}