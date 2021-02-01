import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Dropdown } from 'react-bootstrap'
import { useState , useEffect } from 'react';
import { useFirestore } from './firebase/useFirestore';
import { uploadFirestore , deleteFirestore } from './firebase/firestoreFunctions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

//ADMIN PAGE
function App() {
  const modules = useFirestore('/moduloose/Uw7nTXVOrY0nocrZDLWH/Modules');
  const collectionsList = useFirestore('moduloose/Uw7nTXVOrY0nocrZDLWH/Skills');
  
  const [collection, setCollection] = useState(null);
  
  //MODULE FORM
  const [formType, setFormType] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");

  useEffect(()=>{
    collection && setCollection(collectionsList.find((col) => col.name === collection.name));
  }, [collectionsList, collection])
  
  const handleChangeType = (e) => {
    setFormType(e.target.value);
  }

  const handleChangeTitle = (e) => {
    setFormTitle(e.target.value);
  }

  const handleChangeContent = (e) => {
    setFormContent(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(formType && formTitle && formContent !== "delete" && formContent !== ""){
      //ADDING OR UPDATING
      let newID = collection.name + formType + formTitle;
      newID = newID.split(" ").join("_");
      console.log(newID);

      if(modules.find(module => module.id === newID)){
        //UPDATING MODULE
        uploadFirestore('/moduloose/Uw7nTXVOrY0nocrZDLWH/Modules', {title: formTitle, content: formContent, id: newID});
      } else {
        //CREATING MODULE
        uploadFirestore('/moduloose/Uw7nTXVOrY0nocrZDLWH/Modules', {title: formTitle, content: formContent, id: newID});
        let newTypes = [...collection.types];
        ////TYPE EXISTS
        let typeExists = collection.types.find((type) => type.typeName === formType);
        if(typeExists) {
          typeExists.moduleIDs.push(newID);
        } 
        ////TYPE DOES NOT EXIST
        else {
          newTypes.push({typeName: formType, moduleIDs: [newID]})
        }
        //UPLOAD COLLECTION
        uploadFirestore('moduloose/Uw7nTXVOrY0nocrZDLWH/Skills', {...collection, types: newTypes});
      }
    } 
    
    else if (formType && formTitle && formContent === ("delete" || "")) {
      //DELETING MODULE
      let deleteID = collection.name + formType + formTitle;
      deleteID = deleteID.split(" ").join("_");
      console.log("MODULES: " + modules);
      console.log("Delete ID: " + deleteID);
      console.log(modules.map(module => console.log(module.id)));
      if(modules.find((module) => module.id === deleteID)){
        //MODULE EXISTS
        deleteFirestore('moduloose/Uw7nTXVOrY0nocrZDLWH/Modules', deleteID);
        //ELIMINATION MODULE ID FROM COLLECTION
        let newTypes = [...collection.types];
        let typeExists = collection.types.find((type) => type.typeName === formType);
        typeExists.moduleIDs = typeExists.moduleIDs.filter((moduleID) => moduleID !== deleteID);
        if(typeExists.moduleIDs.length === 0){
          ////EMPTY TYPE, DELETE
          newTypes = newTypes.filter((type) => type.typeName !== formType);
        }
        uploadFirestore('moduloose/Uw7nTXVOrY0nocrZDLWH/Skills', {...collection, types: newTypes});
      } else {
        //MODULE DOES NOT EXIST
        console.log("Module does not exist");
      }
    } else if (formType && formContent === "delete"){
      console.log("We are deleting a type");
    } else {
      console.log("No valid option");
    }
    setFormType("");
    setFormTitle("");
    setFormContent("");
  }

  //RENDER USER PAGE
  return (
    <div id="app" className="admin">
      <div id="content-container">
        <div>
          <h1>Moduloose Admin</h1>
          {/*SELECT COLLECTION*/ collectionsList &&
            <Dropdown>
              <Dropdown.Toggle variant="light">
                  {collection ? collection.name : "Select Collection"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {collectionsList.map(collection => {
                  return(
                    <Dropdown.Item id={collection.name} onClick={() => setCollection(collection)}>{collection.name}</Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          }
          {/*VIEW MODULES*/ modules && collection &&
            collection.types.sort((a, b)=>{
              var x = a.typeName.toLowerCase();
              var y = b.typeName.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
            }).map(type => {
              return (
                <Dropdown id={type.typeName} className="selector-dropdown">
                  <Dropdown.Toggle variant="dark">
                  {type.typeName} 
                  </Dropdown.Toggle>
                  <CopyToClipboard id={type.typeName} text={type.typeName}><button className="btn btn-light edit-button">Copy Type</button></CopyToClipboard>
                  <Dropdown.Menu>
                    {type.moduleIDs && type.moduleIDs.map(moduleID => {
                      let module = modules.find(module => module.id === moduleID); 
                      if(module){
                        return(
                          <CopyToClipboard id={moduleID} text={module.title}><Dropdown.Item  onClick={() => console.log("Clicked")}>{module.title}</Dropdown.Item></CopyToClipboard>
                        );}
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              )
            })
          }
          {/*EDIT MODULE FORM*/modules && collection &&
            <form className="form-container">
              <h3>Add-Update-Remove Module</h3>
              <label>Type</label>
              <input id="type-input" type="text" value={formType} onChange={handleChangeType}></input>
              <label>Title</label>
              <input id="title-input" type="text" value={formTitle} onChange={handleChangeTitle}></input>
              <label>Content</label>
              <textarea id="content-input" type="text" value={formContent} onChange={handleChangeContent}></textarea>
              <button className="btn btn-dark edit-button" onClick={handleSubmit}>Submit</button>
            </form>       
          }
        </div>
      </div>
    </div>
  );
  
}

export default App;