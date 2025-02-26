'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/context/AuthContextContainer';
import { Loader2, UnlockKeyhole, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { storeUserAndJwt, setUser, setJwt } = useContext<any>(AuthContext);
  const url = process.env.NEXT_PUBLIC_URL;

  async function onSubmit(data: any) {
    try {
      data.collegeId = data.collegeId.toUpperCase();

      setLoading(true);
      const req = await fetch(`${url}/api/v1/note-nestle/auth/Login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const data1 = await req.json();
      console.log(req.ok);
      console.log(data1);

      if (req.ok) {
        storeUserAndJwt(data1.data, data1.token);
        setJwt(data1.token);
        setUser(data1.data);
        router.push('/');
      } else {
        toast.error(data1.message, {
          className: 'toast toast-fail',
        });
      }
    } catch {
      toast.error('Something went wrong', {
        className: 'toast toast-fail',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-[100vh] absolute z-10 light:bg-[rgba(255, 255, 255, 0.7)] dark:bg-[rgba(0,0,0,0.85)] top-0 left-0 backdrop-blur">
      <div className=" grid p-[3rem]  items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  border border-borderN gap-[1.5rem] rounded-[11px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[21rem] flex flex-col gap-[2rem]"
        >
          <p className="text-[3rem] font-fontPrimary text-center">Login Page</p>
          <div className="relative">
            <User className="absolute top-2 left-1" />
            <Input
              type="text"
              {...register('collegeId')}
              placeholder="Enter your college Id"
              required
              className="text-[1.2rem] pl-[2.5rem]"
            />
          </div>
          <div className="relative mt-[-1rem]">
            <UnlockKeyhole className="absolute top-2 left-1" />
            <Input
              type="password"
              {...register('password')}
              placeholder="Enter your password"
              required
              className="text-[1.2rem]  pl-[2.5rem]"
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-[-1rem]"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!loading && 'Submit'}
          </Button>
        </form>
      </div>
      <Toaster toastOptions={{ duration: 5000 }} />
    </div>
  );
};

export default LoginPage;
