// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

package spec

import (
	"github.com/gogo/protobuf/jsonpb"
	"github.com/streamnative/function-mesh/api/v1alpha1"
	appsv1 "k8s.io/api/apps/v1"
	autov1 "k8s.io/api/autoscaling/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func MakeSinkHPA(sink *v1alpha1.Sink) *autov1.HorizontalPodAutoscaler {
	objectMeta := MakeSinkObjectMeta(sink)
	return MakeHPA(objectMeta, *sink.Spec.Replicas, *sink.Spec.MaxReplicas, sink.Kind)
}

func MakeSinkService(sink *v1alpha1.Sink) *corev1.Service {
	labels := MakeSinkLabels(sink)
	objectMeta := MakeSinkObjectMeta(sink)
	return MakeService(objectMeta, labels)
}

func MakeSinkStatefulSet(sink *v1alpha1.Sink) *appsv1.StatefulSet {
	objectMeta := MakeSinkObjectMeta(sink)
	return MakeStatefulSet(objectMeta, sink.Spec.Replicas, MakeSinkContainer(sink), MakeSinkLabels(sink))
}

func MakeSinkObjectMeta(sink *v1alpha1.Sink) *metav1.ObjectMeta {
	return &metav1.ObjectMeta{
		Name:      sink.Name,
		Namespace: sink.Namespace,
		OwnerReferences: []metav1.OwnerReference{
			*metav1.NewControllerRef(sink, sink.GroupVersionKind()),
		},
	}
}

func MakeSinkContainer(sink *v1alpha1.Sink) *corev1.Container {
	return &corev1.Container{
		// TODO new container to pull user code image and upload jars into bookkeeper
		Name:            "pulsar-sink",
		Image:           DefaultRunnerImage,
		Command:         MakeSinkCommand(sink),
		Ports:           []corev1.ContainerPort{GRPCPort, MetricsPort},
		Env:             generateContainerEnv(sink.Spec.SecretsMap),
		Resources:       sink.Spec.Resources,
		ImagePullPolicy: corev1.PullIfNotPresent,
		EnvFrom:         generateContainerEnvFrom(sink.Spec.Pulsar.PulsarConfig, sink.Spec.Pulsar.AuthConfig),
	}
}

func MakeSinkLabels(sink *v1alpha1.Sink) map[string]string {
	labels := make(map[string]string)
	labels["component"] = ComponentSink
	labels["name"] = sink.Name
	labels["namespace"] = sink.Namespace

	return labels
}

func MakeSinkCommand(sink *v1alpha1.Sink) []string {
	return MakeCommand(sink.Spec.Java.JarLocation, sink.Spec.Java.Jar,
		sink.Spec.Name, sink.Spec.ClusterName, generateSinkDetailsInJSON(sink),
		sink.Spec.Resources.Requests.Memory().ToDec().String(),
		sink.Spec.Pulsar.AuthConfig != "")
}

func generateSinkDetailsInJSON(sink *v1alpha1.Sink) string {
	sourceDetails := convertSinkDetails(sink)
	marshaler := &jsonpb.Marshaler{}
	json, error := marshaler.MarshalToString(sourceDetails)
	if error != nil {
		// TODO
		panic(error)
	}
	return json
}