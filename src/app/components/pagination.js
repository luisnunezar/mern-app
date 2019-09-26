import React from 'react';

const Pagination = ({ tareasPorPagina, cantTareasTotal, paginate, pagAct }) => {
    const numeroDePaginas = [];

    for (let i = 1; i <= Math.ceil(cantTareasTotal / tareasPorPagina); i++) {
        numeroDePaginas.push(i);
    }

    return (
        <ul className="pagination">
            <li><a onClick={() => paginate(pagAct - 1)} href="#!"><i class="material-icons">chevron_left</i></a></li>
            {numeroDePaginas.map(numero => (
                <li key={numero} className="waves-effect">
                    <a onClick={() => paginate(numero)} href="#!">{numero}</a>
                </li>
            ))}
            <li className="waves-effect"><a onClick={() => paginate(pagAct + 1)} href="#!"><i class="material-icons">chevron_right</i></a></li>
        </ul>
    )
}

export default Pagination;