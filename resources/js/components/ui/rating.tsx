import { Star } from 'lucide-react';

interface RatingDisplayProps {
    value: number;
    size?: 'sm' | 'default' | 'lg';
    showValue?: boolean;
}

export function RatingDisplay({ value, size = 'default', showValue = false }: RatingDisplayProps) {
    const sizeClasses = {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        className={`${sizeClasses[size]} ${
                            index < Math.floor(value)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
            {showValue && (
                <span className="text-sm font-medium ml-1">
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    );
}

interface RatingInputProps {
    value: number;
    onChange: (value: number) => void;
    size?: 'sm' | 'default' | 'lg';
    disabled?: boolean;
}

export function RatingInput({ value, onChange, size = 'default', disabled = false }: RatingInputProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
    };

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
                <button
                    key={rating}
                    type="button"
                    onClick={() => !disabled && onChange(rating)}
                    className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'} transition-transform`}
                    disabled={disabled}
                >
                    <Star
                        className={`${sizeClasses[size]} ${
                            rating <= value
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                        }`}
                    />
                </button>
            ))}
        </div>
    );
} 