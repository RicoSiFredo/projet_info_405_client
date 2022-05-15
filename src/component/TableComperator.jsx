import TableComperatorRow from "./TableComperatorRow";

function TableComperator({offre}){
    return <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Score</th>
                <th scope="col">Nom</th>
                <th scope="col">Compétences</th>
            </tr>
        </thead>
        <tbody>
            {
                offre.requestList.map((request, index) =>
                    <TableComperatorRow 
                        offre={offre} 
                        index={index} 
                        request={request}/>
                )
            }
        </tbody>
    </table>
}
export default TableComperator;