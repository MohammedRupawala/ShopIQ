
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import {useTable,Column,TableOptions,useSortBy,usePagination} from "react-table"

function TableHoc<T extends object>(
    columns:Column<T>[],
    data:T[],
    containerClassname:string,
    heading:string,
    showPagination: boolean

){
    return function HOC(){
        const options:TableOptions<T>={
            columns,
            data,
            initialState:{
                pageSize:8
            },
            showPagination : false
            
        }
        const {getTableProps,getTableBodyProps,headerGroups,page,prepareRow,
               nextPage,previousPage,canNextPage,canPreviousPage,
               gotoPage,state:{pageIndex},pageCount}  = useTable(options,useSortBy,usePagination);
        return (
        <div className={containerClassname}>
            <h2 className="heading">{heading}</h2>
            <table className='table' {...getTableProps()}>
                <thead >
                    {
                        headerGroups.map((headerGroup)=>(
                            <tr{...headerGroup.getHeaderGroupProps()}>
                           { headerGroup.headers.map((column:any)=>(
                                <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                                {
                                    column.render("Header")
                                }
                                {column.isSorted && <span> {" "}{column.isSortedDesc ?<AiOutlineSortDescending/>:<AiOutlineSortAscending/>}</span>}
                                </th>
                            ))}</tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row)=>{
                            prepareRow(row);
                            return(
                                <tr{...row.getRowProps()}>
                                {
                                    row.cells.map((cell)=>(
                                        <td {...cell.getCellProps()}>
                                            {
                                                cell.render("Cell")
                                            }
                                        </td>
                                    ))
                                }
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
            
                {
                   showPagination && <div className="tablePagination">
                     <button  disabled={!canPreviousPage}onClick={previousPage}>Prev</button>
                     <span>{`${pageIndex + 1} of ${pageCount}`}</span>
                     <button  disabled={!canNextPage}onClick={nextPage}>Next</button>
                     <button disabled={!canPreviousPage} onClick={()=>gotoPage(0)}>Home Page</button>
                     <button disabled={!canNextPage} onClick={()=>gotoPage(pageCount-1)}>Last Page</button>
                   </div>
                }
           
        </div>
        )
    }
}

export default TableHoc