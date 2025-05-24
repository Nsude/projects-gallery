import { useState } from "react";
import {projectList} from "./components/DummyData";
import PreviewModal from "./components/PreviewModal";
import ProjectListItem from "./components/ProjectListItem";
import './App.css'

function App() {

  return (
    <div className="h-[100vh] w-full flex items-center">
      <Projects />
    </div>
  )
}

export default App;


const Projects = () => {
  const [modal, setModal] = useState({activeIndex: 0, displayModal: false});

  return (
    <section 
      className="w-full px-desktop">
      {/* LABELS */}
      <div className="flex items-center justify-between mb-[10px] opacity-40">
        <span className="w-[20%]">Project</span>
        <div className="w-[46%] flex justify-between">
          <span>Service</span>
          <span>Duration</span>
        </div>
        <span className="w-[20%] text-right" >Year</span>
      </div>

      {/* PROJECTS */}
      <div
        onMouseEnter={() => setModal(prev => { return {...prev, displayModal: true} })}
        onMouseLeave={() => setModal(prev => { return {...prev, displayModal: false} })} 
      >
        {
          [...projectList, ...projectList].map((item, i) => (
            <ProjectListItem 
              key={`project-${i}`} 
              project={item}
              onMouseEnter={() => setModal(prev => { return {...prev, activeIndex: i} })}
            />
          ))
        }
      </div>

      <PreviewModal 
        projectList={[...projectList, ...projectList]} 
        modal={modal}/>
    </section>
  )
}