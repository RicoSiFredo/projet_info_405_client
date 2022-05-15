import TableComperatorCol from "./TableComperatorCol";
import TableComperatorRow from "./TableComperatorRow";

const SORT_TYPE = {
    ASC: 1,
    DESC: -1,
    UNDEFINED: 0,
    CANT: 2
}

const COL_LIST = [
    {
        name: "#",
        sort: SORT_TYPE.CANT
    },
    {
        name: "Score",
        sort: SORT_TYPE.ASC
    },
    {
        name: "Nom",
        sort: SORT_TYPE.CANT
    },
    {
        name: "Compétences",
        sort: SORT_TYPE.UNDEFINED
    }
]

function TableComperator({offre}){
    
    return <table class="table table-striped">
        <thead>
            <tr>
                {
                    COL_LIST.map((col, index) =>
                        <TableComperatorCol
                            col={col}>

                        </TableComperatorCol>
                    )
                }
            </tr>
        </thead>
        <tbody>
            {
                offre.requestList.map((request, index) =>
                    <TableComperatorRow 
                        offre={offre} 
                        index={index+1} 
                        request={request}/>
                )
            }
        </tbody>
    </table>
}
export default TableComperator;