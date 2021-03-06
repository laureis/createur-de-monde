var path = "C:\\Users\\moi\\Desktop\\DECALAGE\\decalage_unity\\";

window.onload = function() {
    checkFile();
    nav();
    updateForm();
    create();
    postit();
}

function checkFile() {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    if (!object.FileExists(path+"creator.txt")) {
        setPath();
        $('#form-container').addClass('hidden');
        return false;
    }
    return true;
}

function setPath() {
    $('#page').append("<div id='setPath'>Chargez le projet</div>");
    $('#setPath').append("<input type='file' id='creatorFile'>");
    $('#setPath').append('<br /><input type="submit" id="submit_path" value="charger">');
    $('#submit_path').click(function() {
        path = $('#creatorFile').val();
        var fileName = getFileName(path);
        path = path.substr(0, path.length - fileName.length);
        $('#form-container').removeClass('hidden');  
        $('#setPath').addClass('hidden');  
        return false;
    });
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
        $('#navCreator').addClass('active');
        $('#navModifier').removeClass('active');
    });
    $('#navModifier').click(function() {
        $('#creator').addClass('hidden');
        $('#update_form').removeClass('hidden');
        $('#navCreator').removeClass('active');
        $('#navModifier').addClass('active');
    });
}


function newWorld(inspiration, world) {

    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.CopyFolder(path + "Assets\\Resources\\"+inspiration, path + "Assets\\Resources\\new\\"+world, false);
    object.CopyFile(path + "Assets\\scenes\\"+inspiration+".unity", path + "Assets\\scenes\\"+world+".unity", false);
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

/* WORLD DELETE */

function deleteWorld(world) {

    var object = new ActiveXObject("Scripting.FileSystemObject");
    var folder = path  + "Assets\\Resources\\new\\" + world;
    object.DeleteFile(path+"Assets\\scenes\\"+world+".unity");
    object.DeleteFolder(folder);
}

/* WORLD UPDATE GENERAL FUNCTIONS */

function updateForm() {
    printWorlds();
    $("#submit_update").click(function () {
        generateUpdateForm($('input[name=name_update]:checked').val());
        return false;
    });  
    $("#delete_world").click(function () {
        console.log($('input[name=name_update]:checked').val());
        deleteWorld($('input[name=name_update]:checked').val());
       // alert("Le monde a bien été supprimé.");
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
        $('#navUpdateAdd').removeClass('active');
        $('#navUpdateList').addClass('active');
    });
    $('#navUpdateList').click(function() {
        $('#updateAddForm').addClass('hidden');
        $('#updateListForm').removeClass('hidden');
        $('#navUpdateAdd').addClass('active');
        $('#navUpdateList').removeClass('active');
    });
}


/* UPDATE_ADD PAGE */

function generateUpdateAddForm(name, display) {
    $('#fieldsetUpdate').append("<div id='updateAddForm' class='hidden'></div>");
    if (display) $('#updateAddForm').removeClass('hidden');
    else $('#updateAddForm').addClass('hidden');
    addBuilding(name);
    addObject(name);
    addTexture(name);
    addTextPanel(name);
    addSkybox(name);
}

function addBuilding(worldName) {
    $('#updateAddForm').append("<p id='addBuilding'>Ajouter une structure building</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", "buildingFile");
    $('#addBuilding').append(x);
    $('#addBuilding').append('<br /><input type="submit" id="submit_building" value="ajouter">');
    $('#submit_building').click(function() {
        if (validateFile($('#buildingFile').val(), "obj")) {
            saveFile(worldName, $('#buildingFile').val(), "3d\\buildings\\prefab\\");
           // alert("Vous venez d'ajouter un building au monde "+worldName+".");
            }
        else// alert("Le fichier doit être un obj");
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
        if (validateFile($('#objectFile').val(), "obj")) {
            saveFile(worldName, $('#objectFile').val(), "3d\\objects\\"+ type+ "\\prefab\\");
           // alert("Vous venez d'ajouter un objet "+type+" au monde "+worldName+".");
            }
        else// alert("Le fichier doit être un obj");
        return false;
    });
}

function addTypeObject() {
    
    $('#addObject').append('<div id="objectType">Type  '+
    '<input type="radio" id="free" name="typeObjet" value ="free"/>'+
    '<label for="free">free</label>'+
    '<input type="radio" id="throwable" name="typeObject" value ="throwable"/>'+
    '<label for="throwable">throwable</label>'+
    '<input type="radio" id="animated" name="typeObject" value ="animated"/>'+
    '<label for="animated">animated</label>'+
    '<input type="radio" id="characters" name="typeObject" value ="characters"/>'+
    '<label for="characters">character</label></div>');
}

function addTexture(worldName) {
    $('#updateAddForm').append("<p id='addTexture'>Ajouter une texture</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", "textureFile");
    $('#addTexture').append(x);
    $('#addTexture').append('<br /><input type="submit" id="submit_texture" value="ajouter">');
    $('#submit_texture').click(function() {
        if (validateFile($('#textureFile').val(), "png")) { 
            saveFile(worldName, $('#textureFile').val(), "materials\\troiscarres\\Textures\\");
           // alert("Vous venez d'ajouter une texture au monde "+worldName+".");
            }
        else// alert("Le fichier doit être un .png");
        return false;
    });
}


function addTextPanel(worldName) {
    $('#updateAddForm').append("<p id='addTextPanel'>Ajouter un texte</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", "textPanelFile");
    $('#addTextPanel').append(x);
    $('#addTextPanel').append('<br /><input type="submit" id="submit_text_panel" value="ajouter">');
    $('#submit_texture').click(function() {
        if (validateFile($('#textPanelFile').val(), "png")) {
            saveFile(worldName, $('#textPanelFile').val(), "materials\\panels\\Textures\\");
           // alert("Vous venez d'ajouter un panneau de texte au monde "+worldName+".");
            }
        else// alert("Le fichier doit être un .png");
        return false;
    });
}

function addSkybox(worldName) {
    $('#updateAddForm').append("<p id='addSkybox'>Ajouter une skybox</p>");
    var x = document.createElement("INPUT");
    x.setAttribute("type", "file");
    x.setAttribute("id", "skyboxFile");
    $('#addSkybox').append(x);
    $('#addSkybox').append('<br /><input type="submit" id="submit_skybox" value="ajouter">');
    $('#submit_skybox').click(function() {
        if (validateFile($('#skyboxFile').val(), "png")) {
            saveFile(worldName, $('#skyboxFile').val(), "materials\\skybox\\Textures\\");
           // alert("Vous venez d'ajouter une skybox au monde "+worldName+".");
            }
        else// alert("Le fichier doit être un .png");
        return false;
    });
}


/* UPDATE_LIST PAGE */

function generateUpdateListForm(name, display) {   
    $('#fieldsetUpdate').append("<div id='updateListForm' class='hidden'></div>"); 
    if (display) $('#updateListForm').removeClass('hidden');
    else $('#updateListForm').addClass('hidden');
    $('#updateListForm').append('<br /><input type="submit" id="select_all" value="sélectionner tout">');
    listBuildings("new\\"+name);
    listObjects("new\\"+name);
    listTextures("new\\"+name);
    listTextPanels("new\\"+name);
    listSkybox("new\\"+name);
    $('#updateListForm').append('<br /><input type="submit" id="delete_object" value="supprimer">');
    $('#delete_object').click(function() {
        selectedFiles = $("input:checkbox:checked");
        for (var i = 0; i < selectedFiles.length; i++) deleteFile(selectedFiles[i].value); 
        return false;
    });
    $('select_all').click(function() {
        unselectedFiles = $("input:checkbox");
        for (var i = 0; i < unselectedFiles.length; i++) unselectedFiles[i].prop( "checked", true );
        return false;
    });
}

function listBuildings(worldName) {
    $('#updateListForm').append("<p id='listBuildings'>Liste des stuctures</p>");
    printDirectory(path + "Assets\\Resources\\"+worldName+"\\3d\\buildings\\prefab", "#listBuildings");
}

function listObjects(worldName) {
    $('#updateListForm').append("<p id='listObjects'>Liste des objets</p>");

    $('#listObjects').append("<p id='listFreeObjects'>Free</p>");
    printDirectory(path + "Assets\\Resources\\"+worldName+"\\3d\\objects\\free\\prefab", "#listFreeObjects");

    $('#listObjects').append("<p id='listThrowableObjects'>Throwable</p>");
    printDirectory(path + "Assets\\Resources\\"+worldName+"\\3d\\objects\\throwable\\prefab", "#listThrowableObjects");
    
    $('#listObjects').append("<p id='listPanels'>Panels</p>");
    printDirectory(path + "Assets\\Resources\\"+worldName+"\\3d\\objects\\panels\\prefab", "#listPanels");
    
    $('#listObjects').append("<p id='listAnimatedObjects'>Animated</p>");
    printDirectory(path + "Assets\\Resources\\"+worldName+"\\3d\\objects\\animated\\prefab", "#listAnimatedObjects");
}

function listTextures(worldName) {
    $('#updateListForm').append("<p id='listTextures'>Liste des textures</p>");
    printDirectory(path + "Assets\\Resources\\"+worldName+"\\materials\\troiscarres\\Textures", "#listTextures");
}

function listTextPanels(worldName) {
    $('#updateListForm').append("<p id='listTextPanels'>Liste des panneaux de textes</p>");
    printDirectory(path + "Assets\\Resources\\"+worldName+"\\materials\\panels\\Textures", "#listTextPanels");
}

function listSkybox(worldName) {
    $('#updateListForm').append("<p id='listSkybox'>Liste des skybox</p>");
    printDirectory(path + "Assets\\Resources\\"+worldName+"\\materials\\skybox\\Textures", "#listSkybox");
}

/* GENERAL UPDATE FUNCTIONS */

function create(world) {
    $("#creator").submit(function (e) {
        newWorld($('input[name=inspi]:checked').val(), $( "input[type=text][name=newName]" ).val());
       // alert("Un tout nouveau monde est né... "+worldName+" !");
        return false;
    });
}

function saveFile(worldName, filePath, type) {
    var fileName = filePath.split(/(\\|\/)/g).pop();
    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.CopyFile(filePath, path + "Assets\\Resources\\new\\"+worldName+"\\"+type+fileName, true);
    console.log("File is copied successfully");
}

function deleteFile(filePath) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    object.DeleteFile(filePath);
}

function deleteDirectory(wolrdName) {

}

/* PRINT FUNCTIONS */

function getWorlds() {

}

function printDirectory(directory, div) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    if (object.FolderExists(directory)) {
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
    else $(div).append("<p class='no'>pas de contenu!</p>");
}

function printWorlds() {
    var directory = path + "Assets\\Resources\\new";
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
    $('#update_form').append('<input for="update_form" id="delete_world" type="submit" value="supprimer">');


}

function getFileName(file) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    var fileName = object.GetFileName(file);
    return fileName;
}

function getFileExtension(file) {
    var object = new ActiveXObject("Scripting.FileSystemObject");
    var fileName = object.GetFileName(file);
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
}

function validateFile(file, extension) {
    return (getFileExtension(file) == extension);
}

