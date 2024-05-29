import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import { Button, Form, Modal, Table } from "react-bootstrap";

function Expenses() {

    const db = getFirestore(app);
    const auth = getAuth()
    const [expenseData, setExpensesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "expense"));
        const data = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setExpensesData(data);
        };
        fetchData();
    }, [db, expenseData]);
    return (
        <div>
            <ExpenseModal auth={auth} db={db} />
            <DarkExample data={expenseData} />
            
        </div>
    )

    function DarkExample ({data}) {
        return (

            <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>#</th>
                <th>Salary</th>
                <th>Expenses</th>
                <th>Revenues</th>
                <th>Sales</th>
                <th>Net Income</th>
                </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (

                <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.userSal}</td>
                <td>{item.userExpense}</td>
                <td>{item.userRev}</td>
                <td>{item.usersale}</td>
                <td>{item.userNetIncome}</td>
                </tr>
            ))}

            </tbody>

            
                
            
            </Table>
        );
        }
}


export default Expenses

function ExpenseModal({ db, auth }) {
    const salaryRef = useRef();
    const expensesRef = useRef();
    const revenueRef = useRef();
    const salesRef = useRef();
    const netIncomeRef = useRef();

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow((s) => !s);
    };
    function handleClose() {
        setShow((s) => !s);
    }
  
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const salary = salaryRef.current.value;
        const expenses = expensesRef.current.value;
        const revenue = revenueRef.current.value;
        const sales = salesRef.current.value;
        const netIncome = netIncomeRef.current.value;

      // Add expense data to Firestore
        setDoc(doc(collection(db, "expense")), {
        // Assuming user data is available elsewhere
        userID: auth.currentUser.uid,
        userSal: salary,
        userExpense: expenses,
        userRev: revenue,
        usersale: sales,
        userNetIncome: netIncome,
        timestamp: new Date().getTime(),

        })
        .then(() => {

            console.log("Expense data added successfully");
            onsubmit(); // Call the onSubmit function passed from the parent component
            handleClose(); // Close the modal after submission

            })
        .catch((error) => {
            console.error("Error adding expense data: ", error.message);
        });
    };
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
            Add expense
            </Button>
            <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Add Expense
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="Text" placeholder="Salary" ref={salaryRef} />
                </Form.Group>
    
                <Form.Group>
                    <Form.Label>Expenses</Form.Label>
                    <Form.Control
                    type="Text"
                    placeholder="Expenses"
                    ref={expensesRef}
                    />
                </Form.Group>
    
                <Form.Group>
                    <Form.Label>Revenues</Form.Label>
                    <Form.Control
                    type="Text"
                    placeholder="Revenues"
                    ref={revenueRef}
                    />
                </Form.Group>
    
                <Form.Group>
                    <Form.Label>Sales</Form.Label>
                    <Form.Control type="Text" placeholder="Sales" ref={salesRef} />
                </Form.Group>
    
                <Form.Group>
                    <Form.Label>Net Income</Form.Label>
                    <Form.Control
                    type="Text"
                    placeholder="Net income"
                    ref={netIncomeRef}
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
                </Form>
    
                <Button onClick={handleClose}>Close</Button>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
            </Modal>
        </>
        );
    }
    
    
    





