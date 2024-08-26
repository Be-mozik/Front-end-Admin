import './Table.css'

const Table = ({childrenHead,childrenBody}) => {
    return(
     <div className="table-wrapper-d">
        <table className="table-dash">
            <thead>
                {childrenHead}
            </thead>
            <tbody>
               {childrenBody}
            </tbody>
        </table>
    </div>
    )
}

export default Table