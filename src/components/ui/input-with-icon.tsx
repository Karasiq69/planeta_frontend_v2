// import React from 'react';
// import {Input, InputProps} from "@/components/ui/input";
// import {CornerDownLeft} from "lucide-react";
// import {Textarea} from "@/components/ui/textarea";
// import {AutosizeTextarea} from "@/components/ui/autosize-textarea";
//
// interface InputWithIconProps extends InputProps {
//     iconComponent?: React.ReactNode;
//     keyboardText?: string;
//     variant?: 'input' | 'textarea' | 'textarea-autosize';
// }
//
// const InputWithIcon: React.FC<InputWithIconProps> = ({
//                                                          iconComponent = <CornerDownLeft
//                                                              className="h-3 w-3 text-gray-400"/>,
//                                                          keyboardText = "",
//                                                          className = "",
//                                                          variant = 'input',
//                                                          ...props
//                                                      }) => {
//     const InputElement =
//         variant === 'input' ? Input :
//             variant === 'textarea' ? Textarea :
//                 variant === 'textarea-autosize' ? AutosizeTextarea : Input;
//
//     return (
//         <div className="relative w-full">
//             <InputElement
//                 className={`pr-10 ${className}`}
//                 {...props as any}
//             />
//             <div className="absolute top-[20%] right-0 flex items-center pr-3 pointer-events-none">
//                 {variant != 'textarea-autosize' &&
//                     <kbd
//                         className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
//                         {keyboardText || iconComponent}
//                     </kbd>
//                 }
//             </div>
//         </div>
//     );
// };
//
// export default InputWithIcon;