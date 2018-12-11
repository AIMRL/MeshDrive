const DropboxTags = require('../Dropbox/DropboxTags');
var mime = require('mime-types')

function MetaDataFormat() 
{

}

MetaDataFormat.prototype.parseDropboxFile= function(file){

    var obj = new Object();    
    obj["path"]=file[DropboxTags.TAG_PATH];
    obj["id"]=file[DropboxTags.TAG_ID];
    obj["name"]=file[DropboxTags.TAG_NAME];
    obj["mimeType"]=file[DropboxTags.TAG_TYPE];
    if(obj["mimeType"]!=="folder")
    {         
        obj["size"]=file[DropboxTags.TAG_SIZE];
    }
    if(mime.lookup(obj["name"])!==false)
    {
        obj["mimeType"]=mime.lookup(obj["name"]);
    }
  
    return obj;
}

module.exports=MetaDataFormat;