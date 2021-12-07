const Title = (props) => {
    const styles = {
        root: {
            padding: "2vh 0 1.5vh 45px",
            fontSize: "37px",
            fontWeight: "bold",
        },
    }
    return (
        <div style={styles.root}>{props.name}</div>
    );
}

export default Title;