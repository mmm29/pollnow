import { Container } from "../components/primitives/Container";
import { useApp } from "../hooks/app";
import { FormEvent, ReactNode, useState } from "react";
import { SectionHeader } from "../components/primitives/SectionHeader";
import { Section } from "../components/primitives/Section";
import { TextInput } from "../components/primitives/TextInput";
import { Field } from "../components/primitives/Field";
import { AlignRight } from "../components/primitives/AlignRight";
import { Button } from "../components/primitives/Button";
import { ChangePasswordRequest } from "@/app/services/settings";
import {
  makeErrorStatus,
  makeSuccessStatus,
  Status,
  StatusType,
} from "../components/primitives/Status";

function FieldsContainer({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-[40vh]">{children}</div>
    </>
  );
}

function ChangePasswordSection() {
  const { settingsService } = useApp();

  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>();
  const [status, setStatus] = useState<StatusType>();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus(undefined);

    if (!oldPassword) {
      setStatus(makeErrorStatus("Specify old password"));
      return;
    }

    if (!newPassword) {
      setStatus(makeErrorStatus("Specify new password"));
      return;
    }

    if (!repeatNewPassword) {
      setStatus(makeErrorStatus("Confirm your new password"));
      return;
    }

    const changePasswordRequest: ChangePasswordRequest = {
      oldPassword,
      newPassword,
      confirmPassword: repeatNewPassword,
    };
    const result = await settingsService.changePassword(changePasswordRequest);

    if (result.isErr()) {
      setStatus(makeErrorStatus(result.error));
      return;
    }

    setStatus(makeSuccessStatus("Password has been changed"));
    setTimeout(() => setStatus(undefined), 3000);
  }

  return (
    <Section>
      <SectionHeader title="Password" />
      <form onSubmit={onSubmit}>
        <FieldsContainer>
          <Field label="Old password">
            <TextInput value={oldPassword} onChange={setOldPassword} />
          </Field>
          <Field label="New password">
            <TextInput value={newPassword} onChange={setNewPassword} />
          </Field>
          <Field label="Confirm new password">
            <TextInput
              value={repeatNewPassword}
              onChange={setRepeatNewPassword}
            />
          </Field>
          <Status status={status} />
          <AlignRight>
            <Button variant="primary" type="submit">
              Change password
            </Button>
          </AlignRight>
        </FieldsContainer>
      </form>
    </Section>
  );
}

export function SettingsPage() {
  return (
    <>
      <Container title="Settings">
        <ChangePasswordSection />
      </Container>
    </>
  );
}
