import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { getAnEnquiry, updateAnEnquiry } from "../features/enquiries/enquirySlice";
import { AppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
function ViewEnquiry() {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const enquiryId = location.pathname.split('/')[3];
    interface enquiryProps {
        enquiryName: string,
        enquiryEmail: string,
        enquiryMobile: string,
        enquiryComment: string,
        enquiryStatus: string,
    }
    const enquiry: enquiryProps = useSelector((state: any) => state.enquiries)
    const { enquiryName, enquiryEmail, enquiryMobile, enquiryComment, enquiryStatus } = enquiry;

    useEffect(() => {
        dispatch(getAnEnquiry(enquiryId))
    }, [enquiryId])

    function navigateBack(){
        navigate(-1)
    }
    function setEnquiryStatus(e: React.ChangeEvent<HTMLSelectElement>, id: string){
		const data = { id, enquiryValues: e.target.value }
		dispatch(updateAnEnquiry(data))
        setTimeout(() => {
            dispatch(getAnEnquiry(enquiryId))
        }, 0)
	}
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-4 title">View Enquiry</h3>
                <button onClick={navigateBack} className="bg-transparent border-0 d-flex align-items-center fs-5 justify-content-betweens gap-2"><BiArrowBack className="fs-5" /> Go back</button>
            </div>
            <div className="mt-5 bg-white p-4 rounded-3 d-flex gap-3 flex-column">
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Name: </h6>
                    <p className="mb-0">{enquiryName}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Mobile Number: </h6>
                    <p className="mb-0">
                        <a href={`tel: +234${enquiryMobile}`}>{enquiryMobile}</a>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Email: </h6>
                    <p className="mb-0">
                        <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
                    </p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Comment: </h6>
                    <p className="mb-0">{enquiryComment}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Status: </h6>
                    <p className="mb-0">{enquiryStatus}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Change Status: </h6>
                    <div>
                        <select 
                        name="" 
                        defaultValue={enquiryStatus ? enquiryStatus : "Submitted"}
                        id=""
                        className="form-control form-select"
                        onChange={(e) => setEnquiryStatus(e, enquiryId)}
                        >
                            <option value="Submitted">Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEnquiry