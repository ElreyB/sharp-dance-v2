import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Form } from '../Form';
import { Label } from '../Label';

const StyledInput2 = styled.input`
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  height: 50px;
  width: 100%;
  padding-left: 12px;
`;

const Wrapper = styled.div`
  background-color: black;
  padding: 0 35px;
  display: flex;
  justify-content: center;
`;

const StyledButton2 = styled.button`
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.blue};
  border: none;
  padding: 5px 25px;
`;

const StyledForm = styled(Form)``;

const HiddenWrapper = styled.div`
  position: absolute;
  left: -5000px;
`;

const StyledLabel = styled(Label)`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
`;

// TypeScript Interfaces for Form Data
interface FormData {
  EMAIL?: string;
  [key: string]: string | undefined;
}

export function Mailchimp(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { EMAIL } = formData;

  return (
    <Wrapper>
      <StyledForm
        action="https://sharpdance.us2.list-manage.com/subscribe/post?u=43b5092106df2ef610d002684&amp;id=986bbed649&amp;f_id=006041e0f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        noValidate
      >
        <StyledLabel htmlFor="mce-EMAIL">Join our mailing list!</StyledLabel>
        <InputContainer>
          <StyledInput2
            type="email"
            value={EMAIL || ''}
            name="EMAIL"
            className="email"
            id="mce-EMAIL"
            placeholder="email address"
            required
            onChange={handleInput}
          />
          {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
          <HiddenWrapper aria-hidden="true">
            <StyledInput2
              type="text"
              name="b_43b5092106df2ef610d002684_986bbed649"
              tabIndex={-1}
              defaultValue=""
            />
          </HiddenWrapper>
          <StyledButton2
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
          >
            Subscribe
          </StyledButton2>
        </InputContainer>
      </StyledForm>
    </Wrapper>
  );
}
