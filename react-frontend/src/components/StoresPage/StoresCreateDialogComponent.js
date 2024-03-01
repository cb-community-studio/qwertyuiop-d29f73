import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const StoresCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    

    useEffect(() => {
        set_entity({});
    }, [props.show]);
    const onSave = async () => {
        let _data = {
            storeName: _entity.storeName,
            address: _entity.address,
            phoneNumber: _entity.phoneNumber,
            openingHours: _entity.openingHours,
            menu: _entity.menu,
            seatingCapacity: _entity.seatingCapacity,
        };

        setLoading(true);
        try {
            
        const result = await client.service("stores").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info stores created successfully" });
        props.onCreateResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };
    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };
    

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="stores-create-dialog-component">
            <div>
                <p className="m-0">Store Name:</p>
                <InputText className="w-full mb-3" value={_entity?.storeName} onChange={(e) => setValByKey("storeName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Address:</p>
                <InputText className="w-full mb-3" value={_entity?.address} onChange={(e) => setValByKey("address", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Phone Number:</p>
                <InputText className="w-full mb-3" value={_entity?.phoneNumber} onChange={(e) => setValByKey("phoneNumber", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Opening Hours:</p>
                <InputText className="w-full mb-3" value={_entity?.openingHours} onChange={(e) => setValByKey("openingHours", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Menu:</p>
                <InputText className="w-full mb-3" value={_entity?.menu} onChange={(e) => setValByKey("menu", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Seating Capacity:</p>
                <InputText className="w-full mb-3" value={_entity?.seatingCapacity} onChange={(e) => setValByKey("seatingCapacity", e.target.value)}  />
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(StoresCreateDialogComponent);