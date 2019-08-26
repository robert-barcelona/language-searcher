import styled from "@emotion/styled";

export const Container = styled.div(props => ({
  backgroundColor: props.color,
  padding: "20px",
  borderRadius: "14px",
  marginBottom: "20px",
  border: "1px solid rgba(100,100,50,0.5)"
}));

export const Title = styled.div((props = { color: "black", size: "16px" }) => ({
  fontSize: props.size,
  fontWeight: "700",
  color: props.color
}));

export const SubmitButton = styled.div({
  marginBottom: "15px"
});
