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
import authService from "../services/auth.service";
import MySwal from "../lib/swal";
import { useSelector } from "react-redux";
export default function Login() {
  const router = useRouter();
  interface MyInputTypes {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  const isLoggedIn = useSelector(
    (state: any) => state.auth.isLoggedIn
  ) as boolean;
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/user", undefined, { shallow: true });
    }
  }, [isLoggedIn, router]);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên không được để trống"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string()
      .required("Mật khẩu không được để trống")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: Yup.string()
      .required("Mật khẩu không được để trống")
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } =
    useForm<MyInputTypes>(formOptions);
  const { errors } = formState;
  const submitRegister = async (data: any) => {
    const { name, email, password } = data;
    try {
      const res = await authService.register(name, email, password);
      if (res.status === 200) {
        MySwal.fire({
          icon: "success",
          title: "Đăng ký thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/user");

      }
      else
      {
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
        title: "Đăng ký thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Container
      display="flex"
      alignItems="center"
      justify="center"
      css={{ height: "100vh" }}
    >
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} md={4}>
          <Card>
            <Card.Header>
              <Text h2>Đăng Ký</Text>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit(submitRegister)}>
                <Input
                  placeholder="Họ và tên"
                  id="name"
                  {...register("name")}
                  width="100%"
                  aria-label="name"
                />
                <Text color="error">{errors.name?.message}</Text>
                <Spacer y={1} />
                <Input
                  placeholder="Email"
                  id="email"
                  {...register("email")}
                  width="100%"
                  aria-label="email"
                />
                <Text color="error">{errors.email?.message}</Text>
                <Spacer y={1} />
                <Input
                  placeholder="Mật khẩu"
                  type="password"
                  id="password"
                  {...register("password")}
                  width="100%"
                  aria-label="password"
                />
                <Text color="error">{errors.password?.message}</Text>
                <Spacer y={1} />
                <Input
                  placeholder="Nhập lại mật khẩu"
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  width="100%"
                  aria-label="confirmPassword"
                />
                <Text color="error">{errors.confirmPassword?.message}</Text>
                <Spacer y={1} />
                <Button type="submit">Đăng ký</Button>
              </form>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      <Button css={{ position: "absolute", top: 10, right: 10 }} onClick={() => router.push("/login")}>
          Đăng nhập
        </Button>
    </Container>
  );
}
