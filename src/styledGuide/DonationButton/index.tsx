import styled from 'styled-components/macro';

const Input = styled.input`
  width: 250px;

  ${({ theme }) => theme.media.mobile`
         width: 300px;
    `}
`;

const Form = styled.form`
  text-align: center;
`;

export const DonationButton: React.FC = () => {
  return (
    <div>
      <Form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="4ZB94B83AVVY8" />
        <Input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </Form>
    </div>
  );
};
