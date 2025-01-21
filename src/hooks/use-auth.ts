import {useMutation, useQuery, useQueryClient,} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';
import {authApi} from "@/lib/auth/auth";

export function useUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => authApi.retrieveUser().then((res) => res.data),
        retry: false,
    });
}

export function useLogin() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            authApi.login(credentials.email, credentials.password),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['user']});
            router.push('/dashboard')
            toast.success('Вход совершен успешно.')
        },
        onError: (error) => {
            toast.error('Ошибка авторизации');
        },
    });
}

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            queryClient.clear();
            router.push('/');
            toast.success('Logout successfully')
        },
    });
}

export function useSignUp() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: (userData: {
            email: string;
            password: string;
            re_password: string;
        }) => authApi.register(userData),
        onSuccess: (data, variables, context) => {
            authApi.login(variables.email, variables.password)
            queryClient.invalidateQueries({queryKey: ['user']});
            queryClient.invalidateQueries({queryKey: ['todos']});
            router.push('/todo');
            toast.success('Account created successfully');
        },
        onError: (error) => {
            toast.error('Sign up failed');
        },
    });
}


export function useSignUpWithAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const signUpMutation = useMutation({
        mutationFn: (userData: {
            email: string;
            password: string;
            re_password: string;
        }) => authApi.register(userData),
    });

    // Create mutation for login
    const loginMutation = useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            authApi.login(credentials.email, credentials.password),
        onSuccess: () => {

            router.push('/todo');
            toast.success('Registration and login successful!');
        },
        onError: () => {
            toast.error('Auto-login after registration failed');
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['user']});
            queryClient.invalidateQueries({queryKey: ['todos']});

        }
    });

    const signUpAndLogin = async (userData: {
        email: string;
        password: string;
        re_password: string;
    }) => {
        try {
            await signUpMutation.mutateAsync(userData);

            await loginMutation.mutateAsync({
                email: userData.email,
                password: userData.password,
            });
        } catch (error) {
            toast.error('Registration failed');
            throw error;
        }
    };

    return {
        signUpAndLogin,
        isLoading: signUpMutation.isPending || loginMutation.isPending,
        error: signUpMutation.error || loginMutation.error,
    };
}