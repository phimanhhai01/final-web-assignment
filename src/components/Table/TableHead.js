import React from 'react';
import { ListCitizensTitles } from '../../constants/citizen/citizens';
/* import { ListUserTitles } from '../../constants/user/user';
 */
const TableHead = (props) => {
    let name = ListCitizensTitles;
    /* if (props.name === "ListUserTitles") {
        name = ListUserTitles;
    } else if (props.name === "ListCitizensTitles") {
        name = ListCitizensTitles;
    } */

    const styles = {
        root: {
            marginLeft: "1vw"
        },
        row: {
            height: "6vh",
        }
    }
    return (
        <thead style={styles.root}>
            <tr style={styles.row}>
                {name.map((element, index) => {
                    return <th key={index}>{element}</th>
                })}
            </tr>
        </thead>
    );
}

export default TableHead;