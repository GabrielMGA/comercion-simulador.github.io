import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useParams = () => {
    const [pres, setPres] = useState('');
    const [decode, setDecode] = useState('');
    const [response, setResponse] = useState({});

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const res = urlParams.get('pres') || '';
        if (res.length > 0) {
            setPres(res);
            setDecode(atob(res));
            setResponse(JSON.parse(atob(res)))
        }
    }, [])

    return [
        pres,
        decode,
        response
    ];
};

const SuccessView = () => {
    const [pres, decode, response] = useParams();
    const [sessionId, setSessionId] = useState('');
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate('/payment', {
            replace: true
        });
    }

    return (
        <div className="container-fluid py-4">
            <main role="main" className="inner cover">
                <h1 className="cover-heading">EL PENTAGONO</h1>
                <p className="lead">Los datos de tu pedido se muestran a continuacion.</p>
                <div className="row mb-4">
                    <div className="col">
                        {pres}
                        <br />
                        {decode}
                        <br />
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Response</h5>
                                <a href="#" className="card-link">{`code: ${response.responseCode}`}</a>
                                <a href="#" className="card-link">{`approvalNumber: ${response.approvalNumber}`}</a>
                                <a href="#" className="card-link">{`transactionId: ${response.transactionID}`}</a>
                                <a href="#" className="card-link"> {`orderId: ${response.orderID}`}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="lead">
                    <button
                        className="btn btn-lg btn-secondary"
                        onClick={navigateTo}>
                        Volver al Inicio
                    </button>
                </p>
            </main>
        </div>
    );
}

export default SuccessView;
