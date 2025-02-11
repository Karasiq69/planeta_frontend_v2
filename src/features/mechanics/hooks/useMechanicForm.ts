import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mechanicSchema, MechanicFormData } from "../components/forms/schema";
import { useState } from "react";
import { Mechanic } from "../types/mechanics";
// import { useCreateMechanic, useUpdateMechanic } from "../api/mutations";

type Props = {
  mechanicData?: Mechanic;
  onUpdate?: (mechanicId: number) => Mechanic;
  onCreate?: (data: Mechanic) => void;
};

export const useMechanicForm = ({ mechanicData, onUpdate, onCreate }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  // const createMechanic = useCreateMechanic();
  // const updateMechanic = useUpdateMechanic();

  const form = useForm<MechanicFormData>({
    resolver: zodResolver(mechanicSchema),
    defaultValues: {
      name: mechanicData?.name || "",
      specialization: mechanicData?.specialization || "",
      qualifications: mechanicData?.qualifications || "",
      hourlyRate: mechanicData?.hourlyRate || 0,
      isActive: mechanicData?.isActive ?? true,
    },
  });

  const onSubmit = async (data: MechanicFormData) => {
    setIsLoading(true);
    try {
      if (mechanicData?.id) {
        // await updateMechanic.mutateAsync({ id: mechanicData.id, ...data });
        onUpdate?.(mechanicData.id);
      } else {
        // const newMechanic = await createMechanic.mutateAsync(data);
        // onCreate?.(newMechanic);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
}; 