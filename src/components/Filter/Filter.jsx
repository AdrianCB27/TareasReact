

function Filter({ onFilter }) {
    
    return (
        <div className="filter">
            <h3>Ver: </h3>
            <button onClick={() => onFilter("todas")}>Todas</button>
            <button onClick={() => onFilter("sin completar")}>Sin completar</button>
            <button onClick={() => onFilter("completadas")}>Completadas</button>
        </div>
    );
}

export default Filter;
