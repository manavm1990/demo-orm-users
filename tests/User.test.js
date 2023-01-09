import { expect, it } from "vitest";
import User from "../app/user/model";

// Valid user data
const username = "test";
const email = "test@test.com";
const password = "testtest";

it("creates a new user", async () => {
  const expected = {
    username,
    email,

    // Make sure it's 8 characters long
    password,
  };

  const actual = User.build(expected);

  // We are not dealing with 'null' property, so just checking for the 'important' stuff.
  expect(actual).toMatchObject(expected);
});

it("throws for a null username", async () => {
  const inValidUser = User.build({
    email,
    password,
  });

  await expect(inValidUser.validate()).rejects.toThrow(
    "Please enter a username"
  );
});

it("throws for a null email", async () => {
  const inValidUser = User.build({
    // Have to pass all required fields
    username,
    password,
  });

  await expect(inValidUser.validate()).rejects.toThrow(
    "Please enter an email address"
  );
});

it("throws for a null password", async () => {
  const inValidUser = User.build({
    username,
    email,
  });

  await expect(inValidUser.validate()).rejects.toThrow(
    "Please enter a password"
  );
});

it("throws for a username that is not alphanumeric", async () => {
  const inValidUser = User.build({
    username: "!",
    email,
    password,
  });

  await expect(inValidUser.validate()).rejects.toThrow(
    "Please enter a valid username"
  );
});

it("throws for an email that is not valid", async () => {
  const inValidUser = User.build({
    username,
    email: "test",
    password,
  });

  await expect(inValidUser.validate()).rejects.toThrow(
    "Please enter a valid email address"
  );
});

it("throws for a password less than 8 characters", async () => {
  const inValidUser = User.build({
    username,
    email,
    password: "test",
  });

  await expect(inValidUser.validate()).rejects.toThrow(
    "Password must be at least 8 characters long"
  );
});
