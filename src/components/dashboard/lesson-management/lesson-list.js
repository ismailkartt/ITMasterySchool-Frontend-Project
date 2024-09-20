import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { swalAlert, swalConfirm } from '../../../helpers/functions/swal'
import {  FaTimes } from 'react-icons/fa'
import {   setListRefreshToken, setOperation } from '../../../store/slices/misc-slice'
import { deleteLesson, getLessonsByPage } from '../../../api/lesson-service'


const LessonList = () => {
  
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const {listRefreshToken} = useSelector(state => state.misc); 

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  })

  const loadData = async (page) => {
    try {
      const resp = await getLessonsByPage(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  }

  const onPage = (event) => {
    setlazyState(event);
  }

  const handleDelete = async (id) => {
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteLesson(id);
      dispatch(setListRefreshToken(Math.random()));
      swalAlert("Lesson was deleted", "success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRecord = () => {
    dispatch(setOperation("new"));
  }

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);
  

  const getOperationButtons = (row) => {
    if(row.built_in){
      return null;
    }
    return (
      <div>
        <Button className='btn-link' onClick={() => handleDelete(row.id)}>
          <FaTimes/>
        </Button>
      </div>
    )
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className='d-flex justify-content-between'>
            <span>Term List</span>
            <Button onClick={handleNewRecord}>New Lesson</Button>
          </Card.Title>

          <DataTable
            lazy
            dataKey="id"
            totalRecords={totalRows}
            loading={loading}
            value={list}
            paginator
            rows={lazyState.rows}
            first={lazyState.first}
            onPage={onPage}
          >
          
            <Column field='term' header="Term"></Column> 
            <Column field="startDate" header="Start Date"></Column> 
            <Column field="endDate" header="End Date"></Column>
            <Column field="lastRegistrationDate" header="Last Registration"></Column>
            <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>  


          </DataTable>

        </Card.Body>
      </Card>
    </Container>
  )
}

export default LessonList