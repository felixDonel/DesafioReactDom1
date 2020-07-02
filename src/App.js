import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repository,setRepository] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=> {
        setRepository(response.data);
    });
}, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
        title : `Novo Repositorio${Date.now()}`,
        url : "http://github.com...",
        techs : "node, java, teste"
    });
    const repositories = response.data;
    console.log(repositories);
    setRepository([...repository, repositories]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    const newRepository = repository.filter(repository=>repository.id!==id);
    console.log(newRepository);
    setRepository(newRepository);

  }

  return (
    <div>
      {repository.map(repository=>(
        <ul data-testid="repository-list" key={repository.id}>
        <li>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
        </li>
      </ul>
      ))}
      

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
