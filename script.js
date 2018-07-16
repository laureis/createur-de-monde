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
    });/*
    setTimeout($(".swag").focus(), 0);
    dragElement(document.getElementById("postit3"));
    $('#postit3 .close').click(function() {
        $('#postit3').addClass('hidden');
    });*/
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
    object.CopyFolder("C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\"+inspiration, "C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\new\\"+world, false);
    object.CopyFile("C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\scenes\\"+inspiration+".unity", "C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\scenes\\"+world+".unity", false);
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
    printWorlds();
    $("#update_form").submit(function () {
        generateUpdateForm($('input[name=name_update]:checked').val());
        return false;
    });
}

function generateUpdateForm(name) {
    $("#update_form").append('<div id="worldToUpdate"></div>');
    generateUpdateFormMenu();
    $('#worldToUpdate').append('<fieldset id="fieldsetUpdate"><legend>Modification du monde '+name+'</legend></fieldset>');
    generateUpdateAddForm(name, true);
    generateUpdateListForm(name, false);
}

function generateUpdateFormMenu() {
    $('#worldToUpdate').html('<nav><ul>'
        + '<li id="navUpdateAdd" class="active">Ajouter</li>'
        + '<li id="navUpdateList">Supprimer</li>'
        + '</ul></nav>');
    navigationUpdateFormMenu();
}

function navigationUpdateFormMenu() {
	$('#navUpdateAdd').click(function() {
        $('#updateAddForm').removeClass('hidden');
        $('#updateListForm').addClass('hidden');
    });
    $('#navUpdateList').click(function() {
        $('#updateAddForm').addClass('hidden');
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
        saveFile(worldName, $('#buildingFile').val(), "3d\\buildings\\prefab\\");
        return false;
    });
}

function addObject(worldName) {
    $('#updateAddForm').append("<p id='addObject'>Ajouter un objet</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", "objectFile");
    $('#addObject').append(x);
    addTypeObject();
    $('#addObject').append('<br /><input type="submit" id="submit_object" value="ajouter">');
    $('#submit_object').click(function() {
        var type = $('input[name=typeObject]:checked').val();
        saveFile(worldName, $('#objectFile').val(), "3d\\objects\\"+ type+ "\\prefab\\");
        return false;
    });
}

function addTypeObject() {
    $('#addObject').append('<div id="objectType">Type  '+
    '<input type="radio" id="free" name="typeObjet" value ="free" checked="checked" />'+
    '<label for="free">free</label>'+
    '<input type="radio" id="throwable" name="typeObject" value ="throwable"/>'+
    '<label for="throwable">throwable</label>'+
    '<input type="radio" id="animated" name="typeObject" value ="animated"/>'+
    '<label for="animated">animated</label>'+
    '<input type="radio" id="characters" name="typeObject" value ="characters"/>'+
    '<label for="characters">character</label></div>');
}
/* UPDATE_LIST PAGE */

function generateUpdateListForm(name, display) {   
    $('#fieldsetUpdate').append("<div id='updateListForm' class='hidden'></div>"); 
    if (display) $('#updateListForm').removeClass('hidden');
    else $('#updateListForm').addClass('hidden');
    listBuildings("new\\"+name);
    listObjects("new\\"+name);
    $('#updateListForm').append('<br /><input type="submit" id="delete_object" value="supprimer">');

}

function listBuildings(worldName) {
    $('#updateListForm').append("<p id='listBuildings'>Liste des stuctures</p>");
    printDirectory("C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\"+worldName+"\\3d\\buildings\\prefab", "#listBuildings");
}

function listObjects(worldName) {
    $('#updateListForm').append("<p id='listObjects'>Liste des objets</p>");

    $('#listObjects').append("<p id='listFreeObjects'>Free</p>");
    printDirectory("C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\"+worldName+"\\3d\\objects\\free\\prefab", "#listFreeObjects");

    $('#listObjects').append("<p id='listThrowableObjects'>Throwable</p>");
    printDirectory("C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\"+worldName+"\\3d\\objects\\throwable\\prefab", "#listThrowableObjects");
    
    $('#listObjects').append("<p id='listPanels'>Panels</p>");
    printDirectory("C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\"+worldName+"\\3d\\objects\\panels\\prefab", "#listPanels");
    
    $('#listObjects').append("<p id='listAnimatedObjects'>Animated</p>");
    printDirectory("C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\"+worldName+"\\3d\\objects\\animated\\prefab", "#listAnimatedObjects");
}

/* GENERAL UPDATE FUNCTIONS */

function create(world) {
    $("#creator").submit(function (e) {
        newWorld($('input[name=inspi]:checked').val(), $( "input[type=text][name=newName]" ).val());
        return false;
    });
}

function saveFile(worldName, filePath, type) {
    var fileName = filePath.split(/(\\|\/)/g).pop();
    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.CopyFile(filePath, "C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\new\\"+worldName+"\\"+type+fileName, true);
    console.log("File is copied successfully");
}

function deleteDirectory(wolrdName) {

}

/* PRINT FUNCTIONS */

function getWorlds() {

}

function printDirectory(directory, div) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    var folder = object.GetFolder(directory);
    var fc = new Enumerator(folder.files);
    $(div).append("<form class='list'></form>")
    for (; !fc.atEnd(); fc.moveNext()) {
        var filePath = directory+"\\"+fc.item().Name;
        if (getFileExtension(filePath).localeCompare("meta") == true)
            $(div+' .list').append('<input type="checkbox" name="feature"'
                +'value="'+filePath+'" />'
                +'<label for="scales"><a href="'+filePath+'">'+fc.item().Name+'</a></label><br />');
    }
}

function printWorlds() {
    var directory = "C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\Assets\\Resources\\new";
    var object = new ActiveXObject("Scripting.FileSystemObject");
    var folder = object.GetFolder(directory);
    var fc = new Enumerator(folder.SubFolders);
    $('#update_form').append('<fieldset id="worldsList"><legend>Monde à modifier</legend></fieldset>');

    var folder
    for (; !fc.atEnd(); fc.moveNext()) {
        folder = fc.item().Name;
        $('#worldsList').append('<div> <input type="radio" id="infini_update" name="name_update" value="'+folder+'" />'
                                +'<label for="infini_update">'+folder+'</label>'
                                +'</div>');

    }
    $('#update_form').append('<input for="update_form" id="submit_update" type="submit" value="modifier">');

}

function getFileExtension(file) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    var fileName = object.GetFileName(file);
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
}

