const Title = (props) => {
    const styles = {
        root: {
            padding: "2vh 0 1vh 45px",
            fontSize: "30px",
            fontWeight: "bold",
        },
    }
    return (
        <div style={styles.root}>{props.name}</div>
    );
}

export default Title;