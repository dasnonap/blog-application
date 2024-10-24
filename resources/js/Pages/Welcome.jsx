import PostListing from '@/Components/PostListing';
import MenuLayout from '@/Layouts/MenuLayout';
import { Head, Link } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Welcome({ auth, laravelVersion, phpVersion, user}) {
    return (
        <MenuLayout user={user}>
            <Head title="Welcome" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg col-span-3">
                        <div className="p-6 text-gray-900">
                            <QueryClientProvider client={queryClient}>
                                <PostListing /> 
                            </QueryClientProvider>
                        </div>
                    </div>
                </div>
            </div>
        </MenuLayout>
    );
}
