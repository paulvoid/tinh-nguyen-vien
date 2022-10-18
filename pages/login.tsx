import {
  Button,
  Card,
  Container,
  Grid,
  Input,
  Spacer,
  Text,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import authService from "../services/auth.service";
import MySwal from "../lib/swal";
export default function Login() {
  const router = useRouter();
  interface MyInputTypes {
    email: string;
    password: string;
  }
  const isLoggedIn = useSelector(
    (state: any) => state.auth.isLoggedIn
  ) as boolean;
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);
  


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } =
    useForm<MyInputTypes>(formOptions);
  const { errors } = formState;

  // form submit handler
  const submitLogin = async (data: any) => {
    const { email, password } = data;
    try {
      const res = await authService.login(email, password);
      if (res.status === 200) {
        MySwal.fire({
          icon: "success",
          title: "Đăng nhập thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/dashboard");
      } else {
        MySwal.fire({
          icon: "error",
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        justify="center"
        css={{ height: "100vh" }}
        fluid
      >
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={4}>
            <Card>
              <Card.Header>
                <Text h2>Đăng nhập</Text>
              </Card.Header>
              <Card.Body>
                <form onSubmit={handleSubmit(submitLogin)}>
                  <Input
                    placeholder="Email"
                    type="email"
                    width="100%"
                    {...register("email")}
                    id="email"
                    aria-label="email"
                  />
                  <Text color="error">{errors.email?.message}</Text>
                  <Spacer y={1} />
                  <Input
                    placeholder="Mật khẩu"
                    type="password"
                    width="100%"
                    {...register("password")}
                    id="password"
                    aria-label="password"
                  />
                  <Text color="error">{errors.password?.message}</Text>
                  <Spacer y={1} />
                  <Button type="submit" aria-label="submit">
                    Đăng nhập
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>

        <Button
          css={{ position: "absolute", top: 10, right: 10 }}
          onClick={() => router.push("/register")}
        >
          Đăng ký
        </Button>
      </Container>
    </>
  );
}
