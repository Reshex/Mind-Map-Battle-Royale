import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Loading from "@/components/loading/Loading";

type LoadingAlertProps = {
    isOpen: boolean;
    error?: string | null;
    onClose: () => void;
};

function LoadingAlert({ isOpen, error, onClose }: LoadingAlertProps) {
    return (
        <AlertDialog open={isOpen || !!error} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{error ? "Error" : null}</AlertDialogTitle>
                </AlertDialogHeader>
                {error ? (
                    <AlertDialogDescription className="text-center mb-4 text-destructive">
                        {error}
                    </AlertDialogDescription>
                ) : (
                    <div className="flex justify-center mb-4">
                        <Loading />
                    </div>
                )}
                <AlertDialogFooter>
                    {error && (
                        <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}



export default LoadingAlert;
