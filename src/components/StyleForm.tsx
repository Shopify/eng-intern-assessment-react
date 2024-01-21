import React from 'react'

interface styleFormProps {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleSelectChange: (e:any) => void
    handleThemeSelect: (e:any) => void
}
const formDivStyle: React.CSSProperties = { textAlign: "center", width: "90%", display:"flex", flexDirection:'column', alignItems:"center" }
const formLabelStyle: React.CSSProperties = { display: "block", margin: "0 0 8px", color: "#333", fontWeight: "bold" }
export function StyleForm({
    handleFormSubmit,
    handleSelectChange,
    handleThemeSelect
                          }:styleFormProps) {


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            width: "300px",
        }}>
            <div style={{ textAlign: "center", width: "100%" }}>
                <label htmlFor="watch-face" style={{
                    display: "block",
                    margin: "0 0 8px",
                    color: "#333",
                    fontWeight: "bold",
                }}>
                    Watch Face
                </label>
                <select id="watch-face" onChange={(e) => handleSelectChange(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            background: "white",
                            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                        }}
                >
                    <option>None</option>
                    <option value={`repeating-conic-gradient(#f0e9e2 0%, #c3b091 10%, #c0ad88 20%, #f0e9e2 30%, #8b8168 40%)`}>
                        Rolex
                    </option>
                    {/* Other options */}
                </select>
            </div>

            <div style={{ textAlign: "center", width: "100%" }}>
            <label htmlFor="watch-face" 
            style={{
                    display: "block",
                    margin: "0 0 8px",
                    color: "#333",
                    fontWeight: "bold",
                }}>
                    Dark Mode
                </label>
                <input 
                    defaultChecked={true}
                    type="checkbox" 
                    id="watch-face" 
                    onChange={(e) => handleThemeSelect(e.target.checked)}
                    style={{
                        
                        width: "30px",
                        height: "30px",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        background: "white",
                        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                />

            </div>

            <form style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                width: "100%",
            }} onSubmit={handleFormSubmit}>
                <div style={formDivStyle}>
                    <label htmlFor="analog-size" style={formLabelStyle}>
                        Analog Size
                    </label>
                    <input id="analog-size" type="number" style={formLabelStyle} />
                </div>
                <div style={formDivStyle}>
                    <label htmlFor="complication-size" style={{
                        display: "block",
                        margin: "0 0 8px",
                        color: "#333",
                        fontWeight: "bold",
                    }}>
                        Complication Size
                    </label>
                    <input id="complication-size" type="number" style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                    }} />
                </div>
                <div style={formDivStyle}>
                    <label htmlFor="second-ticks" style={formLabelStyle}>
                        Second Ticks
                    </label>
                    <select id="second-ticks" style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        background: "white",
                        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <button type="submit" style={{
                    padding: "12px 20px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#6200ea",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    transition: "background-color 0.3s",
                }}
                >
                    Change Style
                </button>
            </form>
        </div>
    )
}

export default StyleForm